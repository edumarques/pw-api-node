export default class LoggerService {
    public info(namespace: string, message: string, location?: string): void {
        location = `[${location}]` || '';
        console.info(`[${LoggerService.getTimeStamp()}][INFO][${namespace}]${LoggerService.getLocation(location)} ${message}`);
    }

    public error(namespace: string, message: string, location?: string): void {
        location = `[${location}]` || '';
        console.error(`[${LoggerService.getTimeStamp()}][ERROR][${namespace}]${LoggerService.getLocation(location)} ${message}`);
    }

    public warn(namespace: string, message: string, location?: string): void {
        location = `[${location}]` || '';
        console.warn(`[${LoggerService.getTimeStamp()}][WARN][${namespace}]${LoggerService.getLocation(location)} ${message}`);
    }

    public debug(namespace: string, message: string, location?: string): void {
        location = `[${location}]` || '';
        console.debug(`[${LoggerService.getTimeStamp()}][DEBUG][${namespace}]${LoggerService.getLocation(location)} ${message}`);
    }

    private static getLocation(location?: string): string {
        return `[${location}]` || '';
    }

    private static getTimeStamp(): string {
        return new Date().toISOString();
    }
}