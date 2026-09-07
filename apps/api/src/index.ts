import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config.js";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";

const isDevelopment = config.NODE_ENV !== "production";

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

app.get("/health", async (request, reply) => {
  try {
    await db.execute(sql`SELECT 1`);
    return { status: "ok", database: "connected" };
  } catch (error) {
    request.log.error(error, "Database health check failed");
    return reply.status(503).send({ status: "error", database: "disconnected" });
  }
});

const start = async () => {
  try {
    await app.listen({ port: config.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Start listening
start();
