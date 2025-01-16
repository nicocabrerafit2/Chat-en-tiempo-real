# 💬 Chat en Tiempo Real

Una aplicación de chat en tiempo real construida con Node.js, Express y Socket.IO, siguiendo el patrón MVC y las mejores prácticas de desarrollo.

## 🚀 Características

- Chat en tiempo real
- Lista de usuarios conectados
- Interfaz intuitiva
- Límite configurable de usuarios y mensajes
- Validación de nombres de usuario
- Diseño responsivo

## 🛠️ Tecnologías Utilizadas

- Express.js
- Socket.IO
- Handlebars
- SweetAlert2
- Helmet (Seguridad)
- CORS
- Compression
- Rate Limiting

## 📁 Instalación

1. Clona el repositorio

```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias

```bash
npm install
```

3. Configura el archivo `.env` según tu necesidad

4. Inicia el servidor

```bash
npm start
```

## 🌐 Formas de Uso

### 1. Uso en Red Local (PC como servidor)

Para usar el chat en tu red WiFi local desde varios dispositivos:

1. En la PC servidor, abre la terminal y ejecuta:

```bash
ipconfig    # En Windows
ifconfig    # En Linux/Mac
```

2. Busca tu dirección IP local (ejemplo: 192.168.0.X)

3. En el archivo `.env`, configura:

```env
HOST="0.0.0.0"
APP_URL="http://192.168.0.X:8080"  # Reemplaza X con tu número
```

4. Inicia el servidor:

```bash
npm start
```

5. Desde otros dispositivos en la misma red WiFi, accede usando:
   - `http://192.168.0.X:8080` (reemplaza X con el número de la IP del servidor)

## ⚙️ Configuración

Variables de entorno disponibles en `.env`:

- `PORT`: Puerto del servidor (default: 8080)
- `HOST`: Host del servidor (usar "0.0.0.0" para acceso en red)
- `APP_URL`: URL de acceso a la aplicación
- `MAX_MESSAGES`: Límite de mensajes almacenados
- `MAX_USERS`: Límite de usuarios conectados

## 👤 Autor

**Nicolas D. Cabrera**

## Despliegue

El archivo `Procfile` en la raíz del proyecto se utiliza para especificar los comandos que deben ejecutarse para iniciar la aplicación. Sin embargo, este archivo puede no ser necesario dependiendo de la plataforma de despliegue que se utilice.
