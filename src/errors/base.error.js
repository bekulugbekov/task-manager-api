export default class BaseError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnAuthorizedError() {
        return new BaseError(401, 'Foydalanuvchi avtorizatsiyadan oʻtmagan');
    }

    static BadRequest(message, errors = []) {
        return new BaseError(400, message, errors);
    }

    static NotFound(message) {
        return new BaseError(404, message);
    }

    static InternalServerError(message) {
        return new BaseError(500, message);
    }
}