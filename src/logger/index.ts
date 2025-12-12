import { Logger } from '@nestjs/common';

export class UserLogger {
  private static readonly logger = new UserLogger();

  public static getLogger(): UserLogger {
    return this.logger;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }
  info(fileName: string, message: string): void {
    Logger.log(`[${this.getTimestamp()}] [${fileName}]: ${message}`);
  }

  error(fileName: string, message: string): void {
    Logger.error(`[${this.getTimestamp()}] [${fileName}]: ${message}`);
  }

  warn(fileName: string, message: string): void {
    Logger.warn(`[${this.getTimestamp()}] [${fileName}]: ${message}`);
  }

  debug(fileName: string, message: string): void {
    Logger.debug(`[${this.getTimestamp()}] [${fileName}]: ${message}`);
  }
}
