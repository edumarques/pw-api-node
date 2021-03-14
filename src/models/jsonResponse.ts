export default class JsonResponse {
    protected status?: string;
    protected message?: string;
    protected data?: any;
    protected exception?: string;

    constructor(status?: string, message?: string, data?: any, exception?: string) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.exception = exception;
    }

    public setMessage(message: string): JsonResponse {
        this.message = message;
        return this;
    }

    public setData(data: any): JsonResponse {
        this.data = data;
        return this;
    }

    public setException(exception: string): JsonResponse {
        this.exception = exception;
        return this;
    }

    public setStatusOk(): JsonResponse {
        this.status = 'OK';
        return this;
    }

    public setStatusError(): JsonResponse {
        this.status = 'Error';
        return this;
    }
}