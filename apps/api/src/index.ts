import Fastify from "fastify";
import cors from "@fastify/cors";

const isDevelopment = process.env.NODE_ENV !== "production";

// Create instance
const app = Fastify({
  logger: isDevelopment
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
    : true,
});

await app.register(cors, {
  origin: isDevelopment ? "http://localhost:5173" : "https://dynastydrive.fun",
  credentials: true,
});

app.get("/health", async () => {
  return { status: "ok" };
});

const port = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Start listening
start();
