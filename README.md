# RepositorioPruebaCapacitacion
Este repositorio servirá de pruebas para ejemplos en la capacitación

## 📋 Descripción General

**BlazorApp** es una aplicación web interactiva desarrollada con **Blazor Server** (.NET 10.0) que sirve como plataforma de aprendizaje y capacitación para desarrolladores. La aplicación implementa componentes interactivos del lado del servidor con una interfaz moderna y responsiva.

## 🎯 Objetivos del Proyecto

- Demostrar funcionalidades core de Blazor Server
- Proporcionar ejemplos prácticos de componentes interactivos
- Implementar patrones de navegación y layout en Blazor
- Mostrar manejo de errores y reconexión automática
- Servir como base para capacitación en desarrollo web moderno

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
BlazorApp/
├── Components/
│   ├── Pages/              # Páginas de la aplicación
│   │   ├── Home.razor
│   │   ├── Counter.razor
│   │   ├── Weather.razor
│   │   ├── Error.razor
│   │   └── NotFound.razor
│   ├── Layout/             # Componentes de diseño
│   │   ├── MainLayout.razor
│   │   ├── NavMenu.razor
│   │   └── ReconnectModal.razor
│   ├── App.razor           # Componente raíz
│   ├── Routes.razor        # Configuración de rutas
│   └── _Imports.razor      # Importaciones globales
├── Properties/
│   └── launchSettings.json
├── wwwroot/                # Recursos estáticos
│   ├── app.css
│   └── lib/bootstrap/
├── Program.cs              # Configuración de la aplicación
├── BlazorApp.csproj        # Archivo de proyecto
└── appsettings.json        # Configuración
```

## 📱 Páginas Disponibles

### Home (`/`)
- **Descripción**: Página de bienvenida principal
- **Archivo**: [Components/Pages/Home.razor](Components/Pages/Home.razor)
- **Funcionalidad**: Saludo inicial y bienvenida

### Counter (`/counter`)
- **Descripción**: Demostración de interactividad con estado
- **Archivo**: [Components/Pages/Counter.razor](Components/Pages/Counter.razor)
- **Funcionalidad**: 
  - Contador numérico que incrementa al hacer clic
  - Componente renderizado en modo `InteractiveServer`
  - Manejo de eventos `@onclick`

### Weather (`/weather`)
- **Descripción**: Ejemplo de carga de datos asincrónica
- **Archivo**: [Components/Pages/Weather.razor](Components/Pages/Weather.razor)
- **Funcionalidad**:
  - Pronóstico meteorológico simulado
  - Carga asincrónica de datos (`OnInitializedAsync`)
  - Representación de datos en tabla HTML
  - Conversión de temperatura (Celsius → Fahrenheit)
  - Renderizado en streaming

### Error (`/Error`)
- **Descripción**: Página de manejo de errores
- **Archivo**: [Components/Pages/Error.razor](Components/Pages/Error.razor)
- **Funcionalidad**:
  - Captura de errores no manejados
  - Visualización de ID de solicitud para debugging
  - Información sobre ambiente de desarrollo

### NotFound (`/not-found`)
- **Descripción**: Página 404 personalizada
- **Archivo**: [Components/Pages/NotFound.razor](Components/Pages/NotFound.razor)
- **Funcionalidad**: Mensaje amigable para rutas no encontradas

## 🎨 Componentes de Diseño

### MainLayout
- **Archivo**: [Components/Layout/MainLayout.razor](Components/Layout/MainLayout.razor)
- **Características**:
  - Layout principal con barra lateral
  - Área de contenido principal responsiva
  - Manejo de errores integrado
  - Estilos CSS módulo: [MainLayout.razor.css](Components/Layout/MainLayout.razor.css)

### NavMenu
- **Archivo**: [Components/Layout/NavMenu.razor](Components/Layout/NavMenu.razor)
- **Características**:
  - Menú de navegación principal
  - Links activos destacados
  - Diseño responsive con toggle para dispositivos móviles
  - Iconos SVG personalizados
  - Estilos: [NavMenu.razor.css](Components/Layout/NavMenu.razor.css)

### ReconnectModal
- **Archivo**: [Components/Layout/ReconnectModal.razor](Components/Layout/ReconnectModal.razor)
- **Características**:
  - Modal de reconexión automática
  - Manejo de desconexiones del servidor
  - Lógica JavaScript: [ReconnectModal.razor.js](Components/Layout/ReconnectModal.razor.js)
  - Estilos animados: [ReconnectModal.razor.css](Components/Layout/ReconnectModal.razor.css)
  - Estados:
    - Intentando reconectar
    - Reconexión fallida
    - Sesión pausada
    - Reanudación fallida

## ⚙️ Configuración

### Program.cs
- Configuración de servicios Razor Components
- Activación de modo InteractiveServer
- Pipeline HTTP con manejo de excepciones
- Redirección de códigos de estado
- Mapeo de componentes Razor

### Configuración de Ambientes

**Desarrollo** ([appsettings.Development.json](appsettings.Development.json)):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

**Producción** ([appsettings.json](appsettings.json)):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Configuración de Ejecución

Especificada en [Properties/launchSettings.json](Properties/launchSettings.json):
- **HTTP**: `http://localhost:5155`
- **HTTPS**: `https://localhost:7169`
- Ambiente: Development
- Lanzamiento de navegador automático

## 🌐 Rutas Principales

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Página de inicio |
| `/counter` | Counter | Contador interactivo |
| `/weather` | Weather | Pronóstico climático |
| `/error` | Error | Página de error |
| `/not-found` | NotFound | Página 404 |

## 🎨 Estilos

### app.css
- **Archivo**: [wwwroot/app.css](wwwroot/app.css)
- **Contenido**:
  - Estilos globales
  - Validaciones de formularios
  - Límites de error
  - Componentes personalizados
  - Colores corporativos (#006bb7, #1b6ec2)

### Bootstrap
- Framework CSS incluido en `wwwroot/lib/bootstrap/`
- Proporciona componentes responsivos
- Utilizado para grid, botones, tablas, etc.

## 🚀 Características Clave

### 1. Interactividad en Servidor
- Componentes renderizados interactivamente en el servidor
- Comunicación en tiempo real vía WebSocket
- Actualización de UI sin recargar la página

### 2. Reconexión Automática
- Modal inteligente que detecta desconexiones
- Reintentos automáticos
- Reanudación de sesiones pausadas
- Recarga de página si es necesario

### 3. Validación y Manejo de Errores
- Página de error personalizada
- Captura de excepciones no manejadas
- Información de debugging en desarrollo

### 4. Responsividad
- Diseño mobile-first
- Menú hamburguesa para dispositivos pequeños
- Sidebar sticky en pantallas grandes

## 📊 Flujo de Solicitud

```
1. Navegador solicita página
2. Servidor renderiza componente Razor
3. JavaScript de Blazor establece conexión WebSocket
4. Usuario interactúa con componente (click, input, etc.)
5. Evento se envía al servidor vía WebSocket
6. Servidor actualiza el estado del componente
7. Cambios se envían al navegador
8. JavaScript actualiza el DOM
9. Si hay desconexión, ReconnectModal intenta reconectar
```

## 🔧 Tecnologías Utilizadas

- **.NET 10.0**: Framework base
- **Blazor Server**: Framework de UI interactiva
- **Razor Components**: Sintaxis de componentes
- **Bootstrap 5**: Framework CSS
- **JavaScript**: Lógica de cliente (Reconnect Modal)
- **CSS3**: Estilos y animaciones

## 📝 Notas Importantes

1. **Ambiente de Desarrollo**: Habilitado por defecto, mostrar stack traces completos
2. **HTTPS**: Redirige automáticamente desde HTTP
3. **HSTS**: Habilitado en producción (30 días por defecto)
4. **Antiforgery**: Habilitado automáticamente

## 🔐 Seguridad

- Protección contra CSRF con antiforgery tokens
- HSTS en producción
- Manejo seguro de excepciones
- Validación en servidor

## 📚 Recursos Adicionales

- [Microsoft Learn - Blazor](https://learn.microsoft.com/aspnet/core/)
- [Documentación oficial de Blazor Server](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models#blazor-server)
- [Bootstrap Documentation](https://getbootstrap.com/)

## 📦 Proyecto Relacionado

- [feature.txt](feature.txt): Simulación de nueva rama de features