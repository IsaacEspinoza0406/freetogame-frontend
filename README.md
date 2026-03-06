# Frontend Client - Catálogo FreeToGame (Actividad 6 AWOS)

Este repositorio contiene la interfaz de usuario desarrollada en **Next.js** para el proyecto de consumo de APIs de terceros. 

Cumpliendo con el patrón de Arquitectura Orientada a Servicios (SOA), este cliente **no se conecta directamente a la API externa**, sino que consume los datos a través de una capa de servicios propia (Proxy) para garantizar seguridad y evitar problemas de CORS.

## Características Principales
* **Catálogo Dinámico:** Visualización en cuadrícula de los juegos disponibles.
* **Vistas de Detalles:** Rutas dinámicas (`/game/[id]`) para consultar información específica de cada juego.
* **Manejo de Estados UI:** Implementación de pantallas de carga (`Loading`), éxito (`Success`) y manejo de errores amigable para el usuario.
* **Peticiones Asíncronas:** Uso exclusivo de `axios` con `async/await`.

## Ejecución con Docker.
Este servicio está configurado para correr en el puerto **5000** mediante la configuración principal del proyecto.
```bash
docker compose up --build