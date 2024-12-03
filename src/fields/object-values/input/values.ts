import {ValueSpaceError} from "./validation/error";
import {computed, makeObservable, observable} from "mobx";


export class SetValue {
    protected _value: string;

    constructor(value: string | null = '') {
        this._value = value ?? '';
        makeObservable<this, '_value'>(this, {
            _value: observable,
            v: computed
        }, {autoBind: true})
    }

    set v(value: string) {
        this._value = value;
    }

    get v() {
        return this._value;
    }
}

export class SetValueTrim extends SetValue {
    constructor(value: string = '') {
        super(value);
    }

    get v() {
        return this._value;
    }

    set v(value: string) {
        const space = value.split(' ');
        if (space.length > 1) {
            throw new ValueSpaceError('spaceAreNotAllowed')
        }
        this._value = value.trim();
    }

}


export class SetValueNumber extends SetValue {
    constructor(value: string = '') {
        super(value);
    }

    get v() {
        return this._value;
    }

    set v(value: string) {

        if (isNaN(Number(value))) {
            throw new ValueSpaceError('onlyNumber')
        }
        this._value = value;
    }

}
