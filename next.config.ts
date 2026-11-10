import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "refactored-space-engine-wr4xw5qxxxgvf9j9x-3000.app.github.dev",
            ],
        },
    },
};

export default nextConfig;
