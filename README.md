# 💬 Chat en Tiempo Real

Una aplicación de chat en tiempo real construida con Node.js, Express y Socket.IO, siguiendo el patrón MVC y las mejores prácticas de desarrollo.

## 🚀 Características

- Chat en tiempo real
- Lista de usuarios conectados
- Interfaz intuitiva
- Notificaciones de conexión/desconexión
- Límite configurable de usuarios y mensajes
- Manejo automático de mensajes antiguos
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

### 2. Uso desde Celular como Servidor

Para ejecutar el servidor desde tu celular:

#### Android (usando Termux):

1. Instala Termux desde Play Store

2. En Termux, ejecuta:
```bash
# Actualizar paquetes
pkg update && pkg upgrade

# Instalar Node.js y Git
pkg install nodejs git

# Clonar el proyecto
git clone [url-del-repositorio]

# Entrar al directorio
cd chat-en-tiempo-real

# Instalar dependencias
npm install
```

3. Obtén la IP de tu celular:
   - Ve a Configuración > WiFi > Tu red conectada > Detalles
   - Busca la "Dirección IP"

4. Configura el `.env`:
```env
HOST="0.0.0.0"
APP_URL="http://[IP-de-tu-celular]:8080"
```

5. Inicia el servidor:
```bash
npm start
```

#### iOS (usando iSH):

1. Instala iSH desde App Store

2. En iSH, ejecuta:
```bash
# Actualizar paquetes
apk update && apk upgrade

# Instalar Node.js y Git
apk add nodejs npm git

# Seguir los mismos pasos que en Android
```

### Notas Importantes:

- Asegúrate de estar conectado a la misma red WiFi
- El firewall puede bloquear las conexiones, configúralo si es necesario
- La IP local cambiará si te conectas a una red diferente
- Algunos routers pueden bloquear este tipo de conexiones

## ⚙️ Configuración

Variables de entorno disponibles en `.env`:

- `PORT`: Puerto del servidor (default: 8080)
- `HOST`: Host del servidor (usar "0.0.0.0" para acceso en red)
- `APP_URL`: URL de acceso a la aplicación
- `MAX_MESSAGES`: Límite de mensajes almacenados
- `MAX_USERS`: Límite de usuarios conectados

## 👤 Autor

**Nicolas D. Cabrera**

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## Despliegue

El archivo `Procfile` en la raíz del proyecto se utiliza para especificar los comandos que deben ejecutarse para iniciar la aplicación. Sin embargo, este archivo puede no ser necesario dependiendo de la plataforma de despliegue que se utilice:

- Para Heroku: El Procfile es necesario para definir los procesos de la aplicación
- Para plataformas como Vercel, Netlify o Railway: El Procfile no es necesario, ya que estas plataformas utilizan la configuración del `package.json` directamente

```
src
