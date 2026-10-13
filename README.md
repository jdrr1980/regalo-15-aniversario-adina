# Experiencia 15º Aniversario • Juan Diego & Adina 🎭🌹

Aplicación web interactiva, responsiva y gamificada diseñada como regalo de 15 aniversario (14 de octubre de 2011 — 14 de octubre de 2026).

---

## 🌹 Resumen de la Experiencia
1. **Acceso Privado (Lock Screen)**:
   - Pantalla de bienvenida con ambientación teatral y misteriosa.
   - **Usuario**: `jdyadina`
   - **Contraseña**: `14102011`
   - Pista sutil integrada para ayudar a Adina a recordarlo.
2. **Prólogo Emotivo**:
   - Carta y palabras de amor de Juan Diego celebrando los 15 años compartidos.
3. **Viaje en 4 Actos (Gamificación con Fotos Reales)**:
   - **Acto 1 (2011)**: El Comienzo en las Fiestas del Pilar (Plaza del Pilar de Zaragoza).
   - **Acto 2 (2011–2012)**: Complicidad, escapadas y fines de semana sorpresa.
   - **Acto 3 (2013–2014)**: Viaje a Rumanía y cumpleaños juntos.
   - **Acto 4 (2015)**: París, el Sena y la mítica Ópera Garnier (conexión clave con el misterio).
4. **La Gran Revelación (El Clímax)**:
   - Efecto de telón, música ambiental y lluvia de confeti de gala.
   - **El Regalo**: Asistir juntos al musical **El Fantasma de la Ópera** en el **Palacio de Congresos de Zaragoza**.
   - **Selector de Funciones de esta Semana (14 al 18 de octubre)**:
     - Miércoles 14 de Octubre – 20:00 h *(¡Hoy, día del aniversario!)*
     - Jueves 15 de Octubre – 20:00 h
     - Viernes 16 de Octubre – 17:00 h y 21:00 h
     - Sábado 17 de Octubre – 17:00 h y 21:00 h
     - Domingo 18 de Octubre – 17:00 h
   - **Aviso Inmediato**: Botón directo para confirmar la fecha con Juan Diego vía WhatsApp con un solo clic.
   - **Golden Ticket**: Pase digital conmemorativo personalizado.

---

## 🛠️ Tecnologías y Arquitectura
- **Frontend**: React 19 + TypeScript + Vite.
- **Estilos**: Tailwind CSS v4 con tipografía Display (`Playfair Display`), tipografía sans (`Outfit`) y paleta teatral (oro champán `#d4af37`, terciopelo carmesí `#9e1c2e`, noche obsidiana `#08090d`).
- **Animaciones e Interacciones**: `motion/react` (Framer Motion).
- **Celebración**: `canvas-confetti`.
- **Audio**: Web Audio API nativa (melodía ambiental tipo caja de música de ópera, sin dependencias externas).
- **Servidor Web**: Contenedor ultraligero con Nginx Alpine y compresión gzip.

---

## 🚀 Despliegue en Portainer y Nginx Proxy Manager (NPM)

### 1. En Portainer (`https://portainer.juandiegorosas.com`)
1. Ve a **Stacks** > **Add stack**.
2. Nombre: `regalo-adina-15-aniversario`.
3. Selecciona **Repository** y pega la URL del repositorio:
   `https://github.com/jdrr1980/regalo-15-aniversario-adina`
   *(O selecciona **Web editor** y pega el contenido de `docker-compose.yml`)*.
4. Haz clic en **Deploy the stack**.

El contenedor quedará escuchando en el puerto interno `8085` del host Docker.

### 2. En Nginx Proxy Manager (NPM)
1. Ve a **Proxy Hosts** > **Add Proxy Host**.
2. **Domain Names**: `jdyadina.juandiegorosas.com`
3. **Scheme**: `http`
4. **Forward Hostname / IP**: IP de tu host Docker (ej. `192.168.50.X` o la IP interna de la red de Docker)
5. **Forward Port**: `8085`
6. Activa:
   - ✅ **Cache Assets**
   - ✅ **Block Common Exploits**
   - ✅ **Websockets Support**
7. En la pestaña **SSL**:
   - Selecciona tu certificado SSL de `*.juandiegorosas.com`.
   - Activa:
     - ✅ **Force SSL**
     - ✅ **HTTP/2 Support**
     - ✅ **HSTS Enabled**
8. Haz clic en **Save**.

¡La web quedará disponible públicamente con candado HTTPS en `https://jdyadina.juandiegorosas.com`!

---

## 💌 Texto Sugerido para el Email Inicial

```text
Asunto: Feliz 15 Aniversario, mi amor... Hay un misterio esperándote 🌹🎭

Para mi querida Adina,

Hoy cumplimos 15 años juntos. 15 años de risas, de viajes, de aprender el uno del otro y de construir cada día nuestra historia.

He preparado algo muy especial y privado solo para ti. He creado un rincón secreto en internet que solo tú puedes abrir:

👉 https://jdyadina.juandiegorosas.com

Para entrar necesitarás dos llaves que solo nosotros conocemos:
• Usuario: Nuestras iniciales y tu nombre juntos (sin espacios).
• Contraseña: El día exacto en que empezó todo nuestro viaje en 8 cifras (DDMMAAAA).

Entra con calma, abre bien los ojos y déjate llevar por las pistas hasta el final. Hay un secreto que nos espera esta misma semana...

Te amo con todo mi corazón,
Juan Diego
```
