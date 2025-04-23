class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string, stack?: string) {
        super(message || "Something went wrong");
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
