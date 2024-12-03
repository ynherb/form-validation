type MessageKeys = string
export abstract class ValueError extends Error {
    readonly type: 'error' | 'success' | 'warning' | null = 'error';


    get message(): MessageKeys {
        return this.message
    }

}
export class ValueSpaceError extends ValueError {
    constructor(message: MessageKeys) {
        super(message);
    }
}

export class ValueDateError extends ValueError {
    constructor(message: MessageKeys) {
        super(message);
    }
}