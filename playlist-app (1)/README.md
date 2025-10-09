# 🎵 MusicList - Lista de Reproducción con Listas Dobles

Aplicación de lista de reproducción musical que implementa una estructura de datos de **lista doblemente enlazada** en TypeScript, con integración a la API de Deezer para buscar canciones reales.

## 🚀 Características

- ✅ **Lista doblemente enlazada**: Implementación completa de la estructura de datos
- 🎵 **Integración con Deezer**: Busca canciones reales desde la API de Deezer
- ➕ **Agregar canciones**: Al inicio, al final o en cualquier posición específica
- 🗑️ **Eliminar canciones**: Elimina cualquier canción de la lista
- ⏭️ **Navegación**: Adelanta y retrocede entre canciones
- 🎨 **Tema rosa**: Diseño moderno con gradientes y animaciones
- 🔊 **Reproducción**: Reproduce previews de 30 segundos de canciones de Deezer

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## 🛠️ Instalación en Visual Studio Code

### Opción 1: Usando el CLI de shadcn (Recomendado)

1. Abre tu terminal en VS Code
2. Ejecuta el siguiente comando:

\`\`\`bash
npx shadcn@latest init
\`\`\`

3. Selecciona las siguientes opciones:
   - ✅ Would you like to use TypeScript? **Yes**
   - ✅ Which style would you like to use? **New York**
   - ✅ Which color would you like to use as base color? **Rose**
   - ✅ Where is your global CSS file? **app/globals.css**
   - ✅ Would you like to use CSS variables for colors? **Yes**
   - ✅ Where is your tailwind.config.js located? **tailwind.config.ts**
   - ✅ Configure the import alias for components? **@/components**
   - ✅ Configure the import alias for utils? **@/lib/utils**

4. El CLI instalará automáticamente todas las dependencias y configurará el proyecto

### Opción 2: Instalación Manual

1. Descarga el proyecto como ZIP desde v0
2. Extrae el contenido en una carpeta
3. Abre la carpeta en Visual Studio Code
4. Abre la terminal integrada (Ctrl + ` o Cmd + `)
5. Instala las dependencias:

\`\`\`bash
npm install
\`\`\`

## 🏃‍♂️ Ejecutar el Proyecto

1. Inicia el servidor de desarrollo:

\`\`\`bash
npm run dev
\`\`\`

2. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

\`\`\`
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout de la aplicación
│   └── globals.css           # Estilos globales con tema rosa
├── components/
│   ├── music-player.tsx      # Componente principal del reproductor
│   ├── song-list.tsx         # Lista de canciones
│   ├── add-song-form.tsx     # Formulario para agregar canciones
│   ├── deezer-search.tsx     # Búsqueda de canciones en Deezer
│   └── ui/                   # Componentes de UI (shadcn)
├── lib/
│   ├── doubly-linked-list.ts # Implementación de lista doblemente enlazada
│   ├── deezer-service.ts     # Servicio para la API de Deezer
│   └── utils.ts              # Utilidades
└── scripts/
    └── doubly_linked_list.py # Implementación en Python (demostración)
\`\`\`

## 🎯 Funcionalidades Principales

### 1. Buscar Canciones en Deezer
- Busca canciones, artistas o álbumes
- Muestra resultados con portadas de álbum
- Agrega canciones directamente a tu lista

### 2. Agregar Canciones Manualmente
- Al inicio de la lista
- Al final de la lista
- En una posición específica (0 a N)

### 3. Reproducir Canciones
- Reproduce previews de 30 segundos
- Controles de play/pause
- Navegación entre canciones (anterior/siguiente)

### 4. Gestionar Lista
- Elimina canciones
- Selecciona canciones para reproducir
- Visualiza la canción actual

## 🐍 Script Python

El proyecto incluye un script Python que demuestra la implementación de la lista doblemente enlazada:

\`\`\`bash
python scripts/doubly_linked_list.py
\`\`\`

## 🎨 Personalización

### Cambiar Colores

Edita el archivo `app/globals.css` para modificar los colores del tema:

\`\`\`css
@theme inline {
  --primary: #ec4899;        /* Rosa principal */
  --primary-foreground: #fff;
  --accent: #f472b6;         /* Rosa acento */
  /* ... más colores ... */
}
\`\`\`

## 📚 Tecnologías Utilizadas

- **Next.js 15**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS v4**: Estilos
- **shadcn/ui**: Componentes de UI
- **Deezer API**: Búsqueda de canciones
- **Python**: Demostración de estructura de datos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- API de Deezer por proporcionar acceso a su catálogo musical
- shadcn/ui por los componentes de UI
- Vercel por Next.js y el hosting

---

Desarrollado con ❤️ usando listas doblemente enlazadas
\`\`\`

```json file="" isHidden
