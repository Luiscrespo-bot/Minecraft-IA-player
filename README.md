<div align="center">
<img width="1200" height="475" alt="Minecraft IA Player Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

# 🎮 Minecraft IA Player

**Un jugador autónomo con IA que juega Minecraft de forma inteligente y colaborativa**

![TypeScript](https://img.shields.io/badge/TypeScript-81.6%25-3178c6)
![React](https://img.shields.io/badge/React-UI-61dafb)
![Minecraft](https://img.shields.io/badge/Minecraft-Mineflayer-green)
![Status](https://img.shields.io/badge/Status-Development-yellow)

</div>

---

## 📋 Tabla de Contenidos

- [¿Qué hace?](#qué-hace)
- [¿Qué NO hace?](#qué-no-hace)
- [Características principales](#características-principales)
- [Requisitos](#requisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo usar](#cómo-usar)
- [Roadmap y Puntos a Futuro](#roadmap-y-puntos-a-futuro)
- [Arquitectura Interna](#arquitectura-interna)
- [Licencia](#licencia)

---

## 🤖 ¿Qué hace?

**Minecraft IA Player** es un agente autónomo controlado por IA que se conecta a un servidor de Minecraft y juega de manera inteligente. El jugador IA:

### Capacidades Principales

✅ **Supervivencia Autónoma**
- Gestiona salud, hambre y protección de forma automática
- Construye refugios y estructuras defensivas
- Evalúa peligros (mobs hostiles, lava, caídas) y reacciona adecuadamente

✅ **Progresión Lógica**
- Progresa desde herramientas de madera → piedra → hierro → diamante
- Recolecta recursos de forma eficiente
- Executa tareas de minería siguiendo una estrategia de prioridades

✅ **Navegación y Exploración**
- Planifica rutas evitando peligros
- Explora el mundo de forma sistemática
- Registra lugares importantes (aldeas, cuevas, estructuras)

✅ **Interacción con el Mundo**
- Craftea objetos y herramientas
- Interactúa con aldeanos (comercio)
- Construye estructuras usando bloques

✅ **Toma de Decisiones**
- Sigue un orden de prioridades (supervivencia > necesidades > progreso)
- Adapta su comportamiento según el entorno y situación
- Solicita ayuda o interrupciones del usuario cuando es necesario

✅ **Comunicación en Tiempo Real**
- Reporta hallazgos importantes
- Notifica cambios de plan y decisiones de alto impacto
- Resume progreso de forma inteligible

---

## ❌ ¿Qué NO hace?

**Por diseño, Minecraft IA Player tiene las siguientes limitaciones:**

❌ **No expone APIs públicas**
- No hay endpoints REST (`/api/health` está deshabilitado)
- No acepta conexiones externas de Socket.io
- La comunicación es únicamente entre el servidor y la UI interna

❌ **No soporta Redstone avanzado (aún)**
- No construye circuitos complejos de Redstone
- No automatiza mecanismos elaborados
- No crea puertas automáticas ni traps sofisticados

❌ **No juega en multijugador competitivo**
- No participa en PvP ofensivo
- Evita conflictos con otros jugadores
- Prioriza cooperación sobre confrontación

❌ **No accede a comandos arbitrarios**
- Los comandos están categorizados y validados
- No ejecuta `/say` o comandos de chat sin contexto
- Solo usa comandos para propósitos claros dentro del objetivo actual

❌ **No optimiza para máxima velocidad**
- Prioriza seguridad sobre velocidad de progreso
- No realiza acciones "cegas" sin verificación
- Se detiene para evaluar riesgos

❌ **No persiste datos entre reinicio**
- La memoria de la IA se reinicia con cada sesión
- No hay guardado automático de progreso
- Cada partida comienza con contexto nuevo

---

## ✨ Características Principales

### 🧠 Sistema de Decisión Inteligente
```
Observar → Analizar → Decidir → Actuar → Comprobar → Actualizar
```
En cada turno, el agente sigue este ciclo para tomar decisiones informadas.

### 🗺️ Gestión de Memoria
- Registra ubicaciones importantes con formato estructurado
- Mantiene registro de hitos alcanzados
- Recuerda peligros conocidos en zonas específicas

### ⚔️ Sistema de Combate Seguro
- Solo pelea si la salud es superior a 12 puntos
- Evalúa el tipo de mob y capacidad de victoria
- Huye si la situación se complica
- Nunca combate en lava o bordes de precipicio

### 🛡️ Prioridades de Supervivencia
1. **Supervivencia inmediata**: defensa, comida, refugio en noche
2. **Necesidades básicas**: madera, piedra, herramientas
3. **Seguridad estructural**: bases y fuentes de luz
4. **Progreso de equipamiento**: mejorar herramientas y armadura
5. **Exploración**: descubrimiento y recursos avanzados
6. **Objetivos de largo plazo**: Nether, End, derrotar dragón

### 🏗️ Construcción Automática
- Genera estructuras usando un **Structure Engine**
- Valida que tenga materiales antes de construir
- Verifica el resultado y corrige discrepancias

---

## 📦 Requisitos

- **Node.js** 18+ (o Bun como alternativa)
- **Clave de API de Gemini** (para funciones de IA)
- **Servidor de Minecraft 1.16+** (Java Edition)
- **npm** o **bun** para gestión de dependencias

### Dependencias Principales
```json
{
  "@google/genai": "Integración con Gemini AI",
  "mineflayer": "Cliente de Minecraft",
  "express": "Servidor web",
  "react": "Interfaz de usuario",
  "socket.io": "Comunicación en tiempo real (deshabilitada por seguridad)",
  "vite": "Build tool y servidor de desarrollo"
}
```

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Luiscrespo-bot/Minecraft-IA-player.git
cd Minecraft-IA-player
```

### 2️⃣ Instalar Dependencias

```bash
npm install
# O si usas Bun:
bun install
```

### 3️⃣ Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y añade tus valores:

```env
# Clave de API de Gemini (obtenla en https://ai.google.dev/)
GEMINI_API_KEY=your_gemini_api_key_here

# URL de la aplicación (importante para OAuth y webhooks)
APP_URL=http://localhost:3000
```

### 4️⃣ Ejecutar la Aplicación

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm run build
npm start
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
Minecraft-IA-player/
├── src/
│   ├── backend/
│   │   ├── bot.ts              # Lógica principal del agente IA
│   │   ├── mcp/                # Model Context Protocol (herramientas)
│   │   └── engines/
│   │       ├── StructureEngine.ts  # Generador de estructuras
│   │       ├── LogicEngine.ts      # Circuitos de Redstone
│   │       └── CommandEngine.ts    # Ejecución de comandos
│   └── frontend/
│       ├── App.tsx             # Componente principal React
│       ├── components/
│       └── pages/
├── server.ts                   # Servidor Express principal
├── package.json
├── tsconfig.json
├── vite.config.ts              # Configuración de Vite
├── README.md                   # Este archivo
└── .env.example                # Variables de entorno de ejemplo
```

### Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `server.ts` | Servidor Express que sirve la UI y gestiona conexiones |
| `src/backend/bot.ts` | Lógica principal: ciclo de decisión del agente |
| `src/frontend/App.tsx` | Dashboard de control y visualización |
| `.env.local` | Configuración de secretos (no commitar) |
| `context_and_instructions.md` | Prompt del sistema (identidad y comportamiento del IA) |

---

## 💻 Cómo Usar

### Iniciando el Agente

1. Inicia el servidor: `npm run dev`
2. Abre el navegador en `http://localhost:3000`
3. Desde la UI, conecta a un servidor de Minecraft proporcionando:
   - **Host**: dirección del servidor (ej. `localhost`)
   - **Puerto**: puerto del servidor (ej. `25565`)
   - **Username**: nombre del bot en el servidor

### Interacción con el Bot

El agente IA puede recibir **comandos del usuario** en lenguaje natural:

```
"Sígueme"              → El bot se posiciona cerca tuyo
"Ve a las coordenadas x, y, z"  → Navega hacia ese punto
"Busca diamantes"      → Inicia exploración de esos recursos
"Construye una casa"   → Genera y construye estructura
"Reporta estado"       → Resumen de salud, hambre, ubicación
"Ataca a ese zombie"   → Combate contra el mob (si es seguro)
"Recoge madera"        → Recolecta recurso especificado
"Espera"               → Detiene acciones en curso
```

### Monitoreo en Tiempo Real

El dashboard React muestra:
- Estado del bot (posición, salud, hambre)
- Inventario actual
- Eventos y hallazgos importantes
- Log de acciones recientes

---

## 🗓️ Roadmap y Puntos a Futuro

### 🔄 Versión 1.1 (Próximo)

- [ ] **Redstone avanzado**: Generador de circuitos automáticos
- [ ] **Persistencia**: Guardado de progreso entre sesiones
- [ ] **Multijugador mejorado**: Cooperación con otros bots
- [ ] **API segura**: Endpoints validados para integración externa
- [ ] **UI mejorada**: Visualizador 3D del mundo en tiempo real

### 📊 Versión 2.0 (Mediano Plazo)

- [ ] **Nether**: Exploración automática del Nether
- [ ] **End**: Búsqueda de fortalezas y preparación para derrotar al dragón
- [ ] **Encantamientos avanzados**: Gestión automática de mesas de encantar
- [ ] **Agricultura sofisticada**: Sistemas de cultivo y ganadería automáticos
- [ ] **Comercio inteligente**: Negociación con aldeas
- [ ] **Portales**: Construcción y uso automático de portales del Nether

### 🚀 Versión 3.0 (Largo Plazo)

- [ ] **Multijugador competitivo**: PvP cooperativo (defensa/estrategia)
- [ ] **Generador procedural**: Creación de estructuras personalizadas
- [ ] **Mapa mundial**: Reconstrucción 3D del mundo explorado
- [ ] **Análisis de rendimiento**: Estadísticas de progreso y eficiencia
- [ ] **Integración con Discord**: Comandos y reportes via bot Discord
- [ ] **Mod support**: Compatible con servidores modificados
- [ ] **API completa**: REST y WebSocket para terceros (con autenticación)

### 🐛 Mejoras Continuas

- Optimización de rutas de navegación
- Mejor reconocimiento de biomas y estructuras
- Expansión de recetas de crafteo
- Mayor robustez en manejo de errores
- Soporte para diferentes versiones de Minecraft

---

## 🏗️ Arquitectura Interna

### Ciclo de Decisión del Agente

```
┌─────────────────────────────────────┐
│        OBSERVAR ENTORNO             │
│  (posición, bloques, mobs, etc.)    │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│      ANALIZAR SITUACIÓN             │
│  (riesgos, oportunidades, estado)   │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│    EVALUAR ORDEN DE PRIORIDADES     │
│  (supervivencia > necesidades >...  │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│   DECIDIR ACCIÓN ÓPTIMA             │
│  (qué hacer en este turno)          │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│   EJECUTAR VÍA MCP/TOOLS            │
│  (enviar comandos a Minecraft)      │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│    VERIFICAR RESULTADO              │
│  (¿se ejecutó como se esperaba?)    │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│   ACTUALIZAR ESTADO INTERNO         │
│  (memoria, objetivo, próximo ciclo) │
└─────────────────────────────────────┘
```

### Motores Especializados

| Motor | Responsabilidad |
|-------|-----------------|
| **Structure Engine** | Genera estructuras 3D (casas, torres, etc.) |
| **Logic Engine** | Diseña circuitos de Redstone |
| **Command Engine** | Ejecuta comandos de Minecraft de forma segura |
| **Navigation Engine** | Planifica rutas seguras entre puntos |
| **Combat Engine** | Evalúa y ejecuta combates seguros |

### Flujo de Datos

```
User Input (natural language)
        ↓
Parser (intent recognition)
        ↓
Planner (descompone en subtareas)
        ↓
Specialized Engines (estructura, redstone, etc.)
        ↓
MCP Tools (interfaz con Minecraft)
        ↓
Minecraft Server
        ↓
Observation (feedback loop)
        ↓
Memory Update
        ↓
Next Decision Cycle
```

---

## 🔐 Seguridad

- **APIs deshabilitadas**: No hay endpoints REST expuestos públicamente
- **Validación de comandos**: Los comandos están categorizados y validados
- **Gestión de secretos**: Claves de API en `.env.local` (no versionado)
- **CORS restringido**: Control de origen de conexiones
- **Sandboxing de usuarios**: El bot no puede ejecutar comandos arbitrarios

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo `LICENSE` para detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs del servidor (`npm run dev` muestra mensajes de debug)
2. Verifica que las variables de `.env.local` están configuradas correctamente
3. Asegúrate que el servidor de Minecraft está accesible
4. Abre un issue en GitHub con detalles del problema

---

## 🎯 Roadmap Visual

```
Versión Actual (1.0)
├── ✅ Supervivencia básica
├── ✅ Progresión de herramientas
├── ✅ Exploración simple
├── ✅ Construcción de estructuras
└── ✅ Comunicación con usuario

Versión 1.1
├── 🔲 Redstone avanzado
├── 🔲 Persistencia de datos
├── ���� Multijugador mejorado
└── 🔲 APIs seguras

Versión 2.0
├── 🔲 Nether completo
├── 🔲 End (derrotar dragón)
├── 🔲 Encantamientos
└── 🔲 Agricultura sofisticada

Versión 3.0
├── 🔲 PvP cooperativo
├── 🔲 Mod support
├── 🔲 API completa
└── 🔲 Integración Discord
```

---

<div align="center">

**Hecho con ❤️ por [Luiscrespo-bot](https://github.com/Luiscrespo-bot)**

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub

</div>
