import { z } from 'zod'

const vars = z.object({
  STRAPI_URL: z.string().url(),
  STRAPI_TOKEN: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  ABLY_API_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"])
})

export const env = vars.parse({
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_TOKEN: process.env.STRAPI_TOKEN,
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  ABLY_API_KEY: process.env.ABLY_API_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  NODE_ENV: process.env.NODE_ENV
})

