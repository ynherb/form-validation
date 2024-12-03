
type MessageKeys = string



export abstract class Require {
    _message: MessageKeys;

    protected constructor(message: MessageKeys) {
        this._message = message;
    }

    get message() {
        return this._message;
    }

    abstract isValid(value: string): boolean;
}

export class IsEmail extends Require {

    constructor(message: MessageKeys = 'fieldIsRequired') {
        super(message)
    }

    isValid(value: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }
}

export class IsEmailOptional extends Require {

    constructor(message: MessageKeys = 'fieldIsRequired') {
        super(message)
    }

    isValid(value: string): boolean {

        if(!value.trim()) {
            return true;
        }
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }
}

export class IsDate extends Require {

    constructor(message: MessageKeys = 'fieldIsRequired') {
        super(message)
    }

    isValid(value: string): boolean {
        const [dd, mm, yyyy] = value.split('/')
        const date = new Date(`${mm}-${dd}-${yyyy}`);
        if (isNaN(date.getTime()) || yyyy?.length < 4) {
            return false
        }
        return true
    }
}

export class IsRequire extends Require {

    constructor(message: MessageKeys = 'fieldIsRequired') {
        super(message)
    }

    get message() {
        return this._message;
    }

    isValid(value: string): boolean {
        return !!value.trim();
    }
}



