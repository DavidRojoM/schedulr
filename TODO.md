Para manejar usuarios en **Schedulr** con autenticación OAuth de Google (o cualquier otro proveedor), necesitas una base de datos con al menos dos tablas clave:

1. **`users`**: Guarda la información principal del usuario.
2. **`user_providers`**: Guarda los datos de autenticación de cada usuario con diferentes proveedores (Google, GitHub, etc.).

---

## **📌 Estructura de la base de datos**

### **1️⃣ Tabla `users` (Usuarios)**

Cada usuario en **Schedulr** debe tener una cuenta única, identificada por su `id`.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- ID único del usuario
    email VARCHAR(255) UNIQUE NOT NULL,            -- Correo del usuario
    name VARCHAR(255) NOT NULL,                    -- Nombre completo
    avatar_url TEXT,                               -- URL del avatar
    created_at TIMESTAMP DEFAULT NOW(),            -- Fecha de registro
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

📌 **Notas:**

- `id`: Se usa UUID para mayor seguridad.
- `email`: Es único porque un usuario puede iniciar sesión con varios métodos pero tener un solo correo.
- `avatar_url`: Foto de perfil obtenida de Google.
- `created_at`, `updated_at`: Para seguimiento.

---

### **2️⃣ Tabla `user_providers` (Proveedores de autenticación)**

Como un usuario puede iniciar sesión con Google, GitHub o email/password, esta tabla almacena las credenciales OAuth.

```sql
CREATE TABLE user_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Relación con `users`
    provider VARCHAR(50) NOT NULL,  -- "google", "github", "facebook", etc.
    provider_user_id VARCHAR(255) NOT NULL,  -- ID del usuario en Google (ej: "123456789")
    access_token TEXT NOT NULL,  -- Token de acceso (puede caducar)
    refresh_token TEXT,  -- Token para renovar el `access_token`
    expires_at TIMESTAMP,  -- Cuándo expira el `access_token`
    UNIQUE (provider, provider_user_id)  -- Un usuario no puede duplicarse en el mismo proveedor
);
```

📌 **Notas:**

- `user_id`: Relaciona con la tabla `users`.
- `provider`: Guarda el nombre del proveedor ("google", "github", etc.).
- `provider_user_id`: Identificador único del usuario en ese proveedor.
- `access_token` y `refresh_token`: Permiten obtener datos sin pedir credenciales nuevamente.
- `expires_at`: Controla la validez del `access_token`.

---

## **📌 ¿Cómo funciona el flujo con esta base de datos?**

1. **Usuario inicia sesión con Google.**
2. **Buscas en `user_providers` si ya existe un usuario con ese `provider_user_id`.**
   - Si **existe**, actualizas su `access_token` y lo autenticas.
   - Si **no existe**, creas un nuevo usuario en `users` y su registro en `user_providers`.
3. **El usuario ya puede usar la app.** 🎉

---

## **📌 Posibles mejoras**

✔ **Añadir tabla `sessions`** para manejar sesiones activas con JWT.  
✔ **Guardar `roles` o `permisos` en `users`** si hay diferentes tipos de usuario.  
✔ **Encriptar `refresh_token`** si usas datos sensibles.

¿Te gustaría que te ayude con una implementación en código? 🚀
