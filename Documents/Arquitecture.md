# Arquitectura de BlazorApp

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    App.razor                        │
│              (Componente Raíz HTML)                 │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼─────┐    ┌─────▼──────┐
   │ Routes   │    │ReconnectModal
   │ (Router) │    │(Manejo de    
   └────┬─────┘    │ desconexiones)
        │          └──────────────┘
   ┌────▼──────────────┐
   │  MainLayout       │
   │  (LayoutComponent)│
   └────┬──────────────┘
        │
   ┌────┴────────────────┐
   │                     │
┌──▼──────┐      ┌──────▼──┐
│NavMenu  │      │  Body   │
│ (Pages) │      │ (Content)
└─────────┘      └────┬────┘
                      │
        ┌─────────────┼──────────────┐
        │             │              │
    ┌───▼──┐    ┌────▼───┐   ┌─────▼───┐
    │Home  │    │Counter │   │ Weather │
    └──────┘    └────────┘   └─────────┘
```

## Ciclo de Vida de Componentes Blazor

```
1. OnInitialized / OnInitializedAsync
   └─> Inicializa parámetros y estado

2. OnParametersSet / OnParametersSetAsync
   └─> Parámetros cambian

3. OnAfterRender / OnAfterRenderAsync
   └─> Después del renderizado en DOM

4. StateHasChanged
   └─> Marca el componente para re-renderizar

5. Dispose
   └─> Limpieza de recursos
```

## Patrón de Datos: Weather Component

```
OnInitializedAsync
    │
    └──> await Task.Delay(500)
         └──> simula latencia
             │
             └──> Random.Shared.Next()
                 │
                 └──> genera datos simulados
                     │
                     └──> forecasts = array
                         │
                         └──> re-renderiza tabla
```

## Comunicación Servidor-Cliente

```
Cliente (Navegador)           Servidor (Blazor Server)
    │                                  │
    │──── WebSocket Conexión ────────>│
    │                                  │
    │<──── Circuit ID ────────────────│
    │                                  │
    │──── Evento (click, input) ─────>│
    │                                  │
    │<──── Cambios DOM ───────────────│
    │                                  │
    │──── Reconexión (si falla) ─────>│
    │                                  │
    └────────── JavaScript ──────────>│
        (ReconnectModal.razor.js)
```

## Estado del Componente Counter

```
Counter.razor
│
├── currentCount: int = 0
│   └── Almacenado en memoria del servidor
│       (específico por sesión/usuario)
│
├── IncrementCount()
│   ├── currentCount++
│   └── StateHasChanged() [automático]
│       └── Re-renderiza el componente
│           └── Envía cambios al cliente
│               └── Actualiza DOM
│
└── @onclick="IncrementCount"
    └── Vincula evento HTML al método C#
```

## Renderizado en Streaming (Weather)

```
@attribute [StreamRendering]

1. Renderizado inicial vacío
   └──> Navegador recibe página rápido
        (con "Loading...")

2. OnInitializedAsync ejecuta
   └──> await Task.Delay(500)
   └──> genera datos

3. Actualización en streaming
   └──> Envía tabla HTML al cliente
   └──> Navegador reemplaza "Loading..."
       con los datos
```

## Reconexión: Máquina de Estados

```
                  ┌──────────────┐
                  │   CONECTADO  │
                  └──────┬───────┘
                         │
              (Desconexión detectada)
                         │
                         ▼
                  ┌──────────────┐
         ┌───────>│   MOSTRANDO  │
         │        │    MODAL     │
         │        └──────┬───────┘
         │               │
    (Reintentar)    (Auto-reintento)
         │               │
         │               ▼
         │        ┌──────────────┐
         │        │  REINTENTANDO│
         │        └──────┬───────┘
         │               │
         │        ┌──────┴──────┐
         │        │             │
      (Éxito) (Fallo)
         │        │
         │        ▼
         │   ┌─────────────────┐
         │   │ REINTENTOS AGOT │
         │   └──────┬──────────┘
         │          │
         │     (Usuario clica
         │      Reintentar)
         │          │
         └──────────┘
```

## Modelo de Datos: Weather Forecast

```csharp
private class WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
    public int TemperatureF 
    {
        get => 32 + (int)(TemperatureC / 0.5556);
    }
}
```

## Inyección de Dependencias

```
Program.cs
    │
    └──> builder.Services.AddRazorComponents()
         └──> Registra componentes Razor
             └──> .AddInteractiveServerComponents()
                 └──> Habilita interactividad server
```

## Manejo de Errores: Flujo

```
1. Error no capturado en componente
   │
   └──> Bubbles up al ErrorBoundary
       │
       └──> Error.razor se renderiza
           │
           └──> Captura HttpContext
           └──> Obtiene Activity ID o TraceId
           └──> Muestra información al usuario
```

## Seguridad: Protección CSRF

```
Blazor automáticamente:
1. Genera token antiforgery
2. Lo incluye en cada solicitud
3. Lo valida en servidor
4. Invalida sesión si falla
```

## Performance: Optimizaciones

1. **Renderizado en Streaming**
   - Páginas complejas se cargan progresivamente

2. **Renderizado Interactivo**
   - Solo componentes que lo necesitan

3. **Caching de Assets**
   - Bootstrap, app.css se cachean

4. **WebSocket**
   - Comunicación bidireccional eficiente