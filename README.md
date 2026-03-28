# 💍 Invitación de Boda Interactiva

Una aplicación web elegante y moderna para compartir detalles de tu boda y recopilar confirmaciones de asistencia (RSVP) de manera segura y eficiente.

## 🎯 Características

- ✨ **Diseño Responsivo & Elegant**: Interfaz minimalista y romántica optimizada para todos los dispositivos
- 🔐 **Sistema RSVP Seguro**: Validación de guests con tokens únicos y URLs personalizadas
- 🎵 **Reproductor de Audio**: Pill flotante con controles de volumen y pausa automática al salir
- 📊 **Gestión de Asistentes**: Base de datos MongoDB para persistencia segura de RSVP
- 🎨 **Tema Personalizable**: Sistema de colores configurable desde `wedding-config.ts`
- ⏱️ **Countdown Dinámico**: Contador de días, horas, minutos y segundos hasta la boda
- 👥 **Sección de Familias**: Visualización elegante de padres y padrinos
- 🗺️ **Ubicaciones**: Detalles de la ceremonia y recepción con enlaces a Google Maps
- 📲 **Selector de Pases**: Interfaz intuitiva para confirmar cantidad de asistentes

## 🏗️ Arquitectura

### Stack Tecnológico

- **Frontend**: React 19.2.3 + Next.js 16.1.6 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS v4
- **Base de Datos**: MongoDB + Mongoose 9.2.4
- **Tipografía**: Next.js Font Optimization (Playfair Display, Great Vibes, Cormorant Garamond)
- **Linter**: ESLint 9

### Estructura del Proyecto

```
.
├── app/
│   ├── globals.css              # Estilos globales y temas Tailwind
│   ├── layout.tsx               # Layout principal con fuentes y metadata
│   ├── page.tsx                 # Página de inicio (próximamente disponible)
│   ├── actions/
│   │   └── rsvp.ts              # Server Action para procesar RSVP
│   └── invitacion/
│       └── [customId]/
│           ├── page.tsx         # Página dinámica del invitado
│           ├── RSVPForm.tsx     # Componente de formulario RSVP (client)
│           └── components/
│               ├── 01-Hero.tsx                 # Sección hero con nombre de la pareja
│               ├── 02-Countdown.tsx            # Contador hacia la boda
│               ├── 03-ParentsSection.tsx       # Padres y padrinos
│               ├── 04-Message.tsx              # Mensaje personalizado
│               ├── 05-EventLocations.tsx       # Ceremonia y recepción
│               ├── 07-RSVPSection.tsx          # Formulario y resultado RSVP
│               └── 08-AudioPill.tsx            # Reproductor de audio flotante
├── lib/
│   ├── mongodb.ts               # Conexión a MongoDB con caché global
│   └── wedding-config.ts        # Configuración centralizada de la boda
├── models/
│   └── Guest.ts                 # Esquema Mongoose para invitados
├── public/
│   ├── audio/
│   │   └── song.webm           # Archivo de música para reproducir
│   └── img/
│       ├── blue-clouds-bg.avif
│       ├── blue-flower.avif
│       ├── blue-leaf.avif
│       ├── floral-top.avif
│       └── goods_section_bg.avif
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── eslint.config.mjs
```

## 📋 Modelo de Datos

### Esquema Guest (MongoDB)

```typescript
{
  _id: ObjectId;
  customId: string;           // Identificador único personalizado
  token: string;              // Token de seguridad para validación
  displayName: string;        // Nombre del invitado
  passesAllowed: number;      // Cantidad de pases permitidos
  passesConfirmed: number;    // Cantidad de pases confirmados
  status: 'pending' | 'confirmed' | 'declined'; // Estado del RSVP
  createdAt: Date;            // Fecha de creación
  updatedAt: Date;            // Última actualización
}
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ 
- npm o yarn
- MongoDB local o Atlas (URL de conexión)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jluSalazar/wedding-invitation.git
   cd wedding
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/wedding?retryWrites=true&w=majority
   ```

4. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Desarrollo

### Comandos Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start

# Ejecutar linter
npm run lint
```

## 🔐 Seguridad

### Validaciones Implementadas

1. **Autenticación de Guests**
   - Validación de `customId` en base de datos
   - Verificación de `token` para acceso autorizado
   - URLs personalizadas al formato `/invitacion/[customId]?token=XYZ`

2. **Protecciones RSVP**
   - Validación de estados: solo guests "pending" pueden actualizar
   - Límite máximo: `passesConfirmed` ≤ `passesAllowed`
   - Prevención de dobles confirmaciones

3. **Server Actions**
   - Validación en servidor de todos los parámetros
   - Manejo de errores robusto y seguro

## 🎨 Personalización

### Configuración de la Boda

Edita `lib/wedding-config.ts`:

```typescript
export const weddingConfig = {
  couple: {
    name1: 'Nombre 1',
    name2: 'Nombre 2',
    // ...
  },
  event: {
    date: 'YYYY-MM-DD',
    displayDate: 'DD de Mes, YYYY',
    venue: 'Ubicación de la ceremonia',
    // ...
  },
  reception: {
    // Detalles de la recepción
  },
  theme: {
    primary: '#3d4f60',     // Color primario
    accent: '#7a8fa3',      // Color acentuado
    bg: '#dce4ec',          // Fondo
  },
  family: {
    parents: {
      bride: [],
      groom: [],
    },
    godparents: {
      general: [],
    },
  },
};
```

### Tema y Colores

- Los colores se definen en `wedding-config.ts`
- Se utilizan con clases Tailwind: `text-primary-700`, `bg-primary-500`
- La escala de colores se mapea automáticamente en `app/globals.css`

## 📱 Características Principales

### 1. Página de Invitado (`/invitacion/[customId]`)

- Validación automática de token y customId
- Mostrar mensaje de error si el acceso es denegado
- Renderizado de componentes: Hero, Countdown, Parents, Message, Locations, RSVP

### 2. Formulario RSVP (Client Component)

- Selector de decisión: "Sí" / "No"
- Spinner de pases (incrementar/decrementar cantidad)
- Validación de límites
- Estado pending/success/error

### 3. Server Action (rsvp.ts)

```typescript
export async function submitRSVP(formData: {
  customId: string;
  token: string;
  decision: 'confirmed' | 'declined';
  passesConfirmed: number;
})
```

### 4. Reproductor de Audio

- Ubicación: bottom-left fija
- Controles: Play/Pause con ícono de música rotante
- Volumen: 50% por defecto, control deslizante al hover
- Auto-pausa: Al salir de la página (pagehide, beforeunload, visibilitychange)

## 🐛 Troubleshooting

### Error: "Guest not found"
- Verifica que `customId` sea correcto
- Confirma que el `token` coincida en la base de datos

### MongoDB Connection Error
- Asegúrate de que `MONGODB_URI` esté correcta en `.env.local`
- Verifica que tu IP esté en la lista de acceso de MongoDB Atlas

### Audio no reproduce
- Confirma que `public/audio/song.webm` existe
- Prueba con un archivo de audio de prueba
- Verifica permisos CORS si es externo

## 📦 Deployment

### Desplegar en Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega variable de entorno `MONGODB_URI`
3. Deploy automático al hacer push a main

### Otras Opciones

- **Netlify**: Requiere serverless functions para Server Actions
- **AWS**: Configurar EC2 o Lambda + API Gateway
- **DigitalOcean**: App Platform con Next.js support

## 📄 Licencia

Este proyecto es privado. Uso personal para la boda de Silvana & Javier.

## 💬 Soporte

Para problemas o sugerencias, abre un issue o contacta al desarrollador.

---

**Última actualización:** Marzo 2026  
**Versión:** 0.1.0
