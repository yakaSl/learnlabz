/**
 * Logger Utility
 * Centralized logging with levels and formatting
 */

import { config } from '@/config/env.config';

// =============================================================================
// TYPES
// =============================================================================

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

const LOG_LEVELS = {
  [LogLevel.ERROR]: 0,
  [LogLevel.WARN]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.DEBUG]: 3,
};

interface LogContext {
  [key: string]: unknown;
}

// =============================================================================
// LOGGER CLASS
// =============================================================================

class Logger {
  private level: LogLevel;
  private isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
    this.level = this.isClient
      ? (config.logging.clientLevel as LogLevel)
      : (config.logging.level as LogLevel);
  }

  /**
   * Check if log level should be displayed
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.level];
  }

  /**
   * Format log message
   */
  private format(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const prefix = this.isClient ? '🌐 CLIENT' : '🖥️  SERVER';

    let formatted = `[${timestamp}] [${prefix}] [${level.toUpperCase()}] ${message}`;

    if (context && Object.keys(context).length > 0) {
      formatted += `\n${JSON.stringify(context, null, 2)}`;
    }

    return formatted;
  }

  /**
   * Get emoji for log level
   */
  private getEmoji(level: LogLevel): string {
    const emojis = {
      [LogLevel.ERROR]: '❌',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.DEBUG]: '🐛',
    };
    return emojis[level];
  }

  /**
   * Log error
   */
  error(message: string, context?: LogContext) {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const emoji = this.getEmoji(LogLevel.ERROR);
    console.error(`${emoji} ${this.format(LogLevel.ERROR, message, context)}`);
  }

  /**
   * Log warning
   */
  warn(message: string, context?: LogContext) {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const emoji = this.getEmoji(LogLevel.WARN);
    console.warn(`${emoji} ${this.format(LogLevel.WARN, message, context)}`);
  }

  /**
   * Log info
   */
  info(message: string, context?: LogContext) {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const emoji = this.getEmoji(LogLevel.INFO);
    console.log(`${emoji} ${this.format(LogLevel.INFO, message, context)}`);
  }

  /**
   * Log debug
   */
  debug(message: string, context?: LogContext) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const emoji = this.getEmoji(LogLevel.DEBUG);
    console.debug(`${emoji} ${this.format(LogLevel.DEBUG, message, context)}`);
  }

  /**
   * Log HTTP request
   */
  request(method: string, url: string, context?: LogContext) {
    this.debug(`HTTP ${method} ${url}`, context);
  }

  /**
   * Log HTTP response
   */
  response(status: number, url: string, context?: LogContext) {
    if (status >= 500) {
      this.error(`HTTP ${status} ${url}`, context);
    } else if (status >= 400) {
      this.warn(`HTTP ${status} ${url}`, context);
    } else {
      this.debug(`HTTP ${status} ${url}`, context);
    }
  }

  /**
   * Log authentication event
   */
  auth(event: string, context?: LogContext) {
    this.info(`🔐 Auth: ${event}`, context);
  }

  /**
   * Log API event
   */
  api(event: string, context?: LogContext) {
    this.debug(`🌐 API: ${event}`, context);
  }

  /**
   * Set log level dynamically
   */
  setLevel(level: LogLevel) {
    this.level = level;
  }
}

// =============================================================================
// EXPORT SINGLETON
// =============================================================================

export const logger = new Logger();
export default logger;
