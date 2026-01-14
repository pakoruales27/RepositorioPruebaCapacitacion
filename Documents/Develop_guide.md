# Guía de Desarrollo - BlazorApp

## 🚀 Configuración Inicial

### Requisitos
- **.NET 10.0 SDK** o superior
- **Visual Studio Code** o **Visual Studio 2024**
- **Node.js** (opcional, para tareas de build)

### Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd BlazorApp

# Restaurar dependencias
dotnet restore

# Compilar
dotnet build

# Ejecutar aplicación
dotnet run
```

Acceder a: `https://localhost:7169`

## 📁 Estructura de Archivos Detallada

### Components/
```
Components/
├── App.razor              # HTML root, carga recursos
├── Routes.razor           # Definición de rutas
├── _Imports.razor         # Imports globales para todos los componentes
│
├── Pages/                 # Páginas (routable)
│   ├── Home.razor         # @page "/"
│   ├── Counter.razor      # @page "/counter"
│   ├── Weather.razor      # @page "/weather"
│   ├── Error.razor        # Página de error
│   └── NotFound.razor     # @page "/not-found"
│
└── Layout/                # Componentes de layout
    ├── MainLayout.razor       # LayoutComponentBase
    ├── MainLayout.razor.css   # Estilos del layout
    ├── NavMenu.razor          # Menú de navegación
    ├── NavMenu.razor.css      # Estilos del menú
    ├── ReconnectModal.razor   # Modal de reconexión
    ├── ReconnectModal.razor.css
    └── ReconnectModal.razor.js
```

## 🔧 Creación de Nuevas Páginas

### Paso 1: Crear archivo .razor

```razorhtml
// filepath: Components/Pages/MyPage.razor
@page "/mypage"
@rendermode InteractiveServer

<PageTitle>My Page</PageTitle>

<h1>Welcome to My Page</h1>

<p>Content here</p>

@code {
    // C# code here
    private string message = "Hello";
    
    private void HandleClick()
    {
        message = "Clicked!";
    }
}
```

### Paso 2: Agregar link en NavMenu

```razorhtml
// En Components/Layout/NavMenu.razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="mypage">
        <span class="bi bi-icon-name" aria-hidden="true"></span> My Page
    </NavLink>
</div>
```

## 🎨 Creación de Nuevos Componentes Reutilizables

```razorhtml
// filepath: Components/MyComponent.razor
@* Componente reutilizable *@

<div class="my-component">
    @ChildContent
</div>

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
    
    [Parameter]
    public string Title { get; set; } = "";
}
```

**Uso:**
```razorhtml
<MyComponent Title="Ejemplo">
    <p>Contenido del componente</p>
</MyComponent>
```

## 💾 Gestión de Estado

### Estado Local
```csharp
@code {
    private int count = 0;
    
    private void Increment()
    {
        count++;
        StateHasChanged(); // Fuerza re-renderizado
    }
}
```

### State Cascading
```razorhtml
<CascadingValue Value="this">
    <ChildComponent />
</CascadingValue>

@code {
    [CascadingParameter]
    public ParentComponent Parent { get; set; }
}
```

## 🔗 Enrutamiento

### Rutas Simples
```razorhtml
@page "/mypage"
```

### Rutas con Parámetros
```razorhtml
@page "/user/{id:int}"

@code {
    [Parameter]
    public int Id { get; set; }
}
```

### Rutas Múltiples
```razorhtml
@page "/page"
@page "/page/{id}"
```

## 📡 Comunicación Asincrónica

### Cargar Datos

```csharp
@code {
    private List<Item> items;
    
    protected override async Task OnInitializedAsync()
    {
        items = await FetchItems();
    }
}
```

### Datos en Streaming
```razorhtml
@attribute [StreamRendering]

@if (items == null)
{
    <p>Cargando...</p>
}
else
{
    @foreach (var item in items)
    {
        <p>@item.Name</p>
    }
}
```

## ✅ Validación de Formularios

```razorhtml
<EditForm Model="model" OnValidSubmit="HandleSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    
    <InputText @bind-Value="model.Name" />
    <ValidationMessage For="@(() => model.Name)" />
    
    <button type="submit">Enviar</button>
</EditForm>

@code {
    private MyModel model = new();
    
    private async Task HandleSubmit()
    {
        // Procesar formulario
        await Task.Delay(1000);
    }
}
```

## 🎯 Vinculación de Datos (Binding)

### Two-Way Binding
```razorhtml
<input @bind="text" />
<p>@text</p>

@code {
    private string text = "";
}
```

### Event Binding
```razorhtml
<button @onclick="HandleClick">Click</button>
<button @onclick="@((e) => HandleClick(e))">Con evento</button>

@code {
    private void HandleClick()
    {
        // handle
    }
}
```

## 🧪 Depuración

### Breakpoints
1. Colocar breakpoint en el código C#
2. Ejecutar con `dotnet run`
3. Interactuar con la página en navegador
4. El debugger se detiene en el breakpoint

### Consola del Navegador
```javascript
// F12 > Console
// Ver logs de Blazor
console.log("Message");
```

### Logging en Blazor
```csharp
protected override async Task OnInitializedAsync()
{
    Console.WriteLine("Initialization started");
    await Task.Delay(1000);
    Console.WriteLine("Initialization complete");
}
```

## 📦 Build y Publicación

### Compilar para Producción
```bash
dotnet publish -c Release
```

### Ejecutar en Producción
```bash
dotnet BlazorApp.dll
```

## 🚢 CI/CD Pipeline

Ver [azure-pipelines.yml](../azure-pipelines.yml)

```yaml
trigger:
- development

pool:
  vmImage: ubuntu-latest

steps:
- script: echo Building BlazorApp
```

## 🔒 Mejores Prácticas

### 1. Nombres Significativos
```csharp
// ❌ Malo
private int x;

// ✅ Bien
private int currentCount;
```

### 2. Componentes Pequeños
```csharp
// ❌ Evitar un componente gigante
// ✅ Dividir en componentes reutilizables
```

### 3. Async/Await
```csharp
// ❌ Evitar bloqueos
var data = FetchData(); // Bloqueante

// ✅ Usar async
var data = await FetchDataAsync();
```

### 4. Validación
```csharp
// ✅ Validar en cliente
[Required]
[StringLength(100)]
public string Name { get; set; }
```

### 5. Manejo de Errores
```csharp
try
{
    await DoSomethingAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

## 📚 Recursos

- [Documentación oficial Blazor](https://learn.microsoft.com/aspnet/core/blazor/)
- [Componentes predefinidos](https://learn.microsoft.com/aspnet/core/blazor/components/)
- [Routing en Blazor](https://learn.microsoft.com/aspnet/core/blazor/fundamentals/routing)
- [Formularios y validación](https://learn.microsoft.com/aspnet/core/blazor/forms-and-input-components)