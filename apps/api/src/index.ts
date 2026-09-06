import Fastify from "fastify";

// Create instance
const isDevelopment = process.env.NODE_ENV !== "production";

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

// Register
app.get("/health", async () => {
  return { status: "ok" };
});

// Start listening
const port = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
