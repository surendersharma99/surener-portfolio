import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string().url().default("postgresql://user:pass@localhost:5432/db"),
    NEXT_RUNTIME: z.enum(["nodejs", "edge"]).default("nodejs"),
    GITHUB_CLIENT_ID: z.string().default("dummy-github-client-id"),
    GITHUB_CLIENT_SECRET: z.string().default("dummy-github-client-secret"),
    GOOGLE_CLIENT_ID: z.string().default("dummy-google-client-id"),
    GOOGLE_CLIENT_SECRET: z.string().default("dummy-google-client-secret"),
    BETTER_AUTH_SECRET: z.string().default("dummy-better-auth-secret-key-for-testing"),
    BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
    UMAMI_API_KEY: z.string().default("dummy-umami-api-key"),
    GITHUB_TOKEN: z.string().default("dummy-github-token")
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_GITHUB_USERNAME: z.string().default("test-user"),
    NEXT_PUBLIC_AVAILABLE_STATUS: z.coerce.boolean().default(true),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().default("dummy-site-id")
  },

  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    UMAMI_API_KEY: process.env.UMAMI_API_KEY,
    NEXT_PUBLIC_AVAILABLE_STATUS: process.env.NEXT_PUBLIC_AVAILABLE_STATUS,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN


  },

  emptyStringAsUndefined: true,

});

export default env;