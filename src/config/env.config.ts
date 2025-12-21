/**
 * Environment Configuration & Validation
 * Centralized environment variable management with runtime validation
 */

import { z } from 'zod';

// =============================================================================
// ENVIRONMENT SCHEMA VALIDATION
// =============================================================================

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
  NEXT_PUBLIC_APP_NAME: z.string().optional().default('LearnLabz'),
  NEXT_PUBLIC_APP_URL: z.string().optional().default('http://localhost:9002'),

  // API Configuration
  NEXT_PUBLIC_API_URL: z.string().optional().default('https://api.learnlabz.com/api'),

  // Authentication
  JWT_SECRET: z.string().optional(),
  JWT_REFRESH_SECRET: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_2FA: z.string().optional().default('false'),
  NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN: z.string().optional().default('false'),
  NEXT_PUBLIC_ENABLE_AI_FEATURES: z.string().optional().default('false'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).optional().default('info'),
  NEXT_PUBLIC_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).optional().default('warn'),

  // Development
  DEBUG: z.string().optional().default('false'),
  NEXT_PUBLIC_DEBUG: z.string().optional().default('false'),
});

// =============================================================================
// VALIDATE ENVIRONMENT
// =============================================================================

function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
}

// =============================================================================
// EXPORT VALIDATED CONFIGURATION
// =============================================================================

export const env = validateEnv();

export const config = {
  app: {
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_APP_URL,
    env: env.NODE_ENV,
    isProduction: env.NODE_ENV === 'production',
    isDevelopment: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
    debug: env.DEBUG === 'true',
  },

  api: {
    baseUrl: env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    retryAttempts: 3,
  },

  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtRefreshSecret: env.JWT_REFRESH_SECRET,
  },

  features: {
    twoFactor: env.NEXT_PUBLIC_ENABLE_2FA === 'true',
    socialLogin: env.NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true',
    aiFeatures: env.NEXT_PUBLIC_ENABLE_AI_FEATURES === 'true',
  },

  logging: {
    level: env.LOG_LEVEL,
    clientLevel: env.NEXT_PUBLIC_LOG_LEVEL,
    debug: env.NEXT_PUBLIC_DEBUG === 'true',
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type AppConfig = typeof config;
export type Environment = z.infer<typeof envSchema>;
