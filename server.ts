import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import { botManager } from "./src/backend/bot.js";
import { createProxyMiddleware } from "http-proxy-middleware";

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(express.json());

  // Proxy for prismarine-viewer
  app.use('/viewer', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true, 
    ws: true 
  }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Socket.io integration with the bot
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    // Send current status
    socket.emit("status", botManager.getStatus());

    socket.on("connect_bot", async (config) => {
      try {
        await botManager.connect(config, io);
      } catch (error) {
        socket.emit("error", "Failed to connect bot: " + (error as Error).message);
      }
    });

    socket.on("disconnect_bot", () => {
      botManager.disconnect();
    });

    socket.on("chat_message", async (message) => {
      // User sent a chat message from web UI
      io.emit("chat", { sender: "WebUser", text: message });
      
      if (!botManager.isConnected()) {
        io.emit("chat", { sender: "system", text: "Bot is not connected. Connect first." });
        return;
      }
      
      // Process with AI
      await botManager.processMessage("WebUser", message, io);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
        watch: null
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Graceful shutdown to prevent port conflicts on restart
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    botManager.disconnect();
    httpServer.close(() => {
      process.exit(0);
    });
  });
}

startServer().catch(console.error);
