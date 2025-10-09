# 📦 Instrucciones de Despliegue en Visual Studio Code

## 🎯 Guía Paso a Paso

### 1️⃣ Descargar el Proyecto

Desde v0, haz clic en los tres puntos (⋮) en la esquina superior derecha del bloque de código y selecciona **"Download ZIP"**.

### 2️⃣ Extraer y Abrir en VS Code

1. Extrae el archivo ZIP en una carpeta de tu elección
2. Abre Visual Studio Code
3. Ve a **File → Open Folder** (o **Archivo → Abrir Carpeta**)
4. Selecciona la carpeta extraída

### 3️⃣ Instalar Dependencias

Abre la terminal integrada en VS Code:
- **Windows/Linux**: `Ctrl + ñ` o `Ctrl + '`
- **Mac**: `Cmd + ñ` o `Cmd + '`

Ejecuta el siguiente comando:

\`\`\`bash
npm install
\`\`\`

Esto instalará todas las dependencias necesarias del proyecto (puede tardar 1-2 minutos).

### 4️⃣ Ejecutar el Proyecto

Una vez instaladas las dependencias, ejecuta:

\`\`\`bash
npm run dev
\`\`\`

Verás un mensaje similar a:

\`\`\`
▲ Next.js 14.2.25
- Local:        http://localhost:3000
- Ready in 2.3s
\`\`\`

### 5️⃣ Abrir en el Navegador

1. Abre tu navegador favorito (Chrome, Firefox, Edge, Safari)
2. Ve a: **http://localhost:3000**
3. ¡Listo! Ya puedes usar la aplicación

## 🎵 Cómo Usar la Aplicación

### Buscar Canciones en Deezer
1. En el panel derecho, verás "Buscar en Deezer"
2. Escribe el nombre de una canción, artista o álbum
3. Haz clic en el botón de búsqueda (🔍)
4. Haz clic en el botón "+" junto a cualquier canción para agregarla

### Agregar Canciones Manualmente
1. Completa el formulario "Agregar Canción"
2. Ingresa: Título, Artista y Duración (ej: 3:45)
3. Selecciona dónde agregar: Al inicio, Al final, o Posición específica
4. Haz clic en "Agregar Canción"

### Reproducir Música
1. Haz clic en cualquier canción de la lista para seleccionarla
2. Haz clic en el botón de Play (▶️) en el reproductor principal
3. Usa los botones de anterior (⏮️) y siguiente (⏭️) para navegar

### Eliminar Canciones
- Haz clic en el icono de basura (🗑️) junto a cualquier canción

## 🐛 Solución de Problemas

### Error: "Cannot find module"
\`\`\`bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
\`\`\`

### Error: "Port 3000 is already in use"
\`\`\`bash
# Usa un puerto diferente
npm run dev -- -p 3001
\`\`\`

### La búsqueda de Deezer no funciona
- Verifica tu conexión a internet
- La API de Deezer puede tener límites de uso
- Intenta buscar términos más específicos

## 🔧 Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start            # Inicia el servidor de producción

# Linting
npm run lint         # Verifica errores de código

# Python (opcional)
python scripts/doubly_linked_list.py  # Ejecuta el script de demostración
\`\`\`

## 📝 Estructura de Archivos Importantes

\`\`\`
📁 Proyecto
├── 📁 app/                    # Páginas de Next.js
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout general
│   └── globals.css           # Estilos globales (tema rosa)
├── 📁 components/            # Componentes React
│   ├── music-player.tsx      # Reproductor principal
│   ├── deezer-search.tsx     # Búsqueda de Deezer
│   ├── song-list.tsx         # Lista de canciones
│   └── add-song-form.tsx     # Formulario agregar
├── 📁 lib/                   # Lógica de negocio
│   ├── doubly-linked-list.ts # Lista doblemente enlazada
│   └── deezer-service.ts     # Servicio API Deezer
├── 📁 scripts/               # Scripts Python
│   └── doubly_linked_list.py # Demostración Python
├── package.json              # Dependencias del proyecto
└── README.md                 # Documentación
\`\`\`

## 🎨 Personalización

### Cambiar el Color del Tema

Edita `app/globals.css` y modifica las variables CSS:

\`\`\`css
:root {
  --primary: oklch(0.65 0.22 345);  /* Rosa principal */
  --accent: oklch(0.75 0.18 350);   /* Rosa acento */
}
\`\`\`

### Agregar Más Canciones Iniciales

Edita `components/music-player.tsx` en la función `useState`:

\`\`\`typescript
list.addAtEnd({
  id: "4",
  title: "Tu Canción",
  artist: "Tu Artista",
  duration: "3:30",
})
\`\`\`

## 🚀 Desplegar en Producción

### Opción 1: Vercel (Recomendado)

1. Crea una cuenta en [vercel.com](https://vercel.com)
2. Instala Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`
3. Despliega:
   \`\`\`bash
   vercel
   \`\`\`

### Opción 2: GitHub + Vercel

1. Sube tu proyecto a GitHub
2. Conecta tu repositorio en Vercel
3. Vercel desplegará automáticamente

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección de Solución de Problemas
2. Verifica que Node.js esté instalado: `node --version`
3. Asegúrate de estar en la carpeta correcta del proyecto

## ✅ Checklist de Verificación

- [ ] Node.js 18+ instalado
- [ ] Proyecto extraído y abierto en VS Code
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Navegador abierto en localhost:3000
- [ ] Búsqueda de Deezer funcionando
- [ ] Reproducción de canciones funcionando

---

¡Disfruta tu aplicación de música! 🎵
\`\`\`
