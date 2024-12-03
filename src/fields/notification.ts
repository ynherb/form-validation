import {makeAutoObservable} from "mobx";

export type TypeNotification = 'error' | 'success' | 'warning' | null;

export type MessageKeys = keyof {[key in string] : string};
export class NotificationModel {
    type: TypeNotification;
    _message: MessageKeys | null;

    constructor(message: MessageKeys | null = null, type: TypeNotification = null) {
        this._message = message;
        this.type = type;
        makeAutoObservable(this, {}, { autoBind: true})
    }

    setMessage(message: MessageKeys, type: TypeNotification) {
        this._message = message;
        this.type = type;
    }

    get error() {
        return {
            type: this.type,
            message: this.message
        }
    }
    get message() {
        return this._message || '';
    }
    reset() {
        this.type = null;
    }
}
