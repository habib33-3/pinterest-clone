class ApiError extends Error {
    statusCode: number;
    key?: string;

    constructor(statusCode: number, message?: string, key?: string, stack?: string) {
        super(message || "Something went wrong");
        this.statusCode = statusCode;
        this.key = key;
        this.name = this.constructor.name;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
