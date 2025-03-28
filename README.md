
# Proyecto de Gestión de Tareas - Frontend (Angular)

Este proyecto es la interfaz de usuario de un sistema de gestión de tareas, construido con **Angular 19** y **Bootstrap** para la parte visual. El frontend se comunica con una API RESTful para realizar operaciones CRUD sobre las tareas.

## Instrucciones de Ejecución

### Requisitos Previos

1. **Node.js** y **npm**:
   - Asegúrate de tener instalada una versión reciente de **Node.js** y **npm**. Si no los tienes instalados, puedes descargarlos desde [Node.js](https://nodejs.org/).

2. **Angular CLI**:
   - Si no tienes instalado el Angular CLI, puedes instalarlo globalmente con el siguiente comando:

   ```bash
   npm install -g @angular/cli
   ```

### Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/gustavogiraldo16/angular-taskmanager.git
   cd angular-taskmanager
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

### Ejecución del Proyecto

Para iniciar la aplicación en modo desarrollo, ejecuta el siguiente comando:

```bash
ng serve
```

Esto lanzará el servidor de desarrollo en `http://localhost:4200/`. Puedes abrir este URL en tu navegador para ver la aplicación en funcionamiento.

### Entorno de Desarrollo

El entorno de desarrollo está configurado para trabajar con **Angular 19**.

## Detalles de Diseño y Decisiones Técnicas

### Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

```
src/
├── app/
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Componentes específicos de cada página
│   ├── services/           # Servicios para manejar la lógica de negocio
│   ├── models/             # Modelos de datos (interfaces y clases)
│   └── app.config.ts       # Configuración general de la aplicación
├── assets/                 # Archivos estáticos como imágenes, fuentes, etc.
├── environments/           # Archivos de configuración de entorno
└── styles/                 # Archivos de estilos globales (CSS)
```

### Decisiones Técnicas

1. **Framework**:
   - **Angular 19** es el framework elegido para construir la SPA (Single Page Application). Utilizamos Angular CLI para facilitar la creación, configuración y despliegue del proyecto.
   
2. **Estilos**:
   - **Bootstrap** se utiliza para la creación de la interfaz visual, ya que proporciona componentes predefinidos y es fácil de integrar.

3. **Routing**:
   - El enrutamiento de la aplicación se gestiona a través del módulo `app.routes.ts` que maneja las rutas principales para los diferentes componentes de la aplicación, como el login, el registro y la lista de tareas.

4. **Formularios**:
   - Se ha decidido usar **`FormsModule`** con **`ngModel`** en lugar de **`ReactiveForms`** debido a la simplicidad y facilidad de uso para formularios básicos como el de login y registro. Esto también permite que el manejo del estado de los formularios sea más directo y menos complejo.

5. **Consumo de API**:
   - Para la interacción con la API del backend, se utiliza el servicio `HttpClient` de Angular. La autenticación se maneja con **JWT** (JSON Web Tokens), y el token se pasa como `Authorization` en los headers de las peticiones HTTP.

6. **Autenticación**:
   - El sistema utiliza JWT para la autenticación y autorización. El token se almacena en el navegador y se incluye en los headers de todas las solicitudes protegidas.
   - El acceso a las rutas de la aplicación se gestiona con un guard de rutas que verifica si el usuario está autenticado antes de permitirle acceder a páginas protegidas como la lista de tareas.

### Decisiones de Seguridad

- **JWT**:
   - Las rutas protegidas requieren un token de autenticación JWT en los headers de las peticiones HTTP.
   - El token JWT debe incluirse como un `Authorization` header en las peticiones que necesiten autorización.

- **Protección de Rutas**:
   - Se ha implementado una protección de rutas utilizando un **Auth Guard** que redirige a los usuarios no autenticados al componente de login.

### Posibles Problemas Conocidos

- **Problema de CORS**: Si la API backend no está configurada para permitir solicitudes CORS desde `http://localhost:4200`, podrías encontrarte con problemas de acceso. Asegúrate de que la API permita solicitudes desde el origen adecuado.

- **Autenticación no Persistente**: El token JWT se almacena en memoria (no en cookies o LocalStorage). En futuras mejoras, se podría agregar persistencia de sesión usando `localStorage` o `sessionStorage`.

### Futuras Mejoras

- **Manejo de Errores**: Se podría mejorar el manejo de errores de las peticiones HTTP mostrando mensajes de error amigables para el usuario.
- **Paginación y Filtros**: Actualmente, todas las tareas se cargan de una vez. Se podrían agregar funcionalidades de paginación y filtros para manejar grandes cantidades de datos.
- **CRUD de Usuarios(Users)**: Implementar CRUD de usuarios que solo el administrador puedad ver.

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un *pull request* o crea un *issue* si encuentras algún problema o tienes sugerencias.

---

¡Gracias por utilizar este proyecto! Si tienes alguna duda o pregunta, no dudes en contactar.
