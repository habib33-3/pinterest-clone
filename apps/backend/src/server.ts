/* eslint-disable no-process-exit */
/* eslint-disable n/no-process-exit */
import app from "./app/app";
import { env } from "./config/env.config";
import { disconnectPrisma } from "./db/prisma";
import { logger } from "./shared/logger";

let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        server = app.listen(env.PORT, () => {
            logger.info(`🚀 Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error(`❌ Failed to start server: ${error}`);
        await shutdown();
    }
}

async function shutdown() {
    logger.info("🧹 Graceful shutdown started...");
    try {
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server.close((err) => (err ? reject(err) : resolve()));
            });
            logger.info("✅ HTTP server closed.");
        }
        await disconnectPrisma();
    } catch (error) {
        logger.error(`💥 Shutdown error: ${error}`);
    } finally {
        process.exit(0); // exit after shutdown is complete
    }
}

// Use anonymous functions for event handlers to avoid async/await in process.on
process.on("SIGINT", () => {
    logger.info("📡 SIGINT received.");
    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${error}`);
    });
});

process.on("SIGTERM", () => {
    logger.info("📡 SIGTERM received.");
    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${error}`);
    });
});

process.on("uncaughtException", (error) => {
    logger.error(`🔥 Uncaught Exception: ${error}`);
    shutdown().catch((shutdownError) => {
        logger.error(`Shutdown error: ${shutdownError}`);
    });
});

process.on("unhandledRejection", (reason) => {
    logger.error(`💡 Unhandled Promise Rejection: ${reason}`);
    shutdown().catch((shutdownError) => {
        logger.error(`Shutdown error: ${shutdownError}`);
    });
});

// Start server and handle fatal errors during startup
startServer().catch(async (error) => {
    logger.error(`❌ Fatal error during startup: ${error}`);
    await shutdown();
});
