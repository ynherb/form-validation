import {action, computed, makeObservable, observable} from "mobx";

import {Require} from "./validation/index";
import {SetValue} from "./values";
import {NotificationModel} from "../../notification";
import {Subscriber} from "../../subscriber";
import {ValueError} from "./validation/error";


class ObjectValueInput extends Subscriber<'scrollIntoView' | 'change'> {
    private readonly requires: Require[];
    private _setValue: SetValue;
    public notification: NotificationModel = new NotificationModel();
    public disabled: boolean;

    constructor(requires: Require | Require[] = [], setValue: SetValue = new SetValue(), disabled = false) {
        super()
        this.disabled = disabled;
        this.requires = Array.isArray(requires) ? requires : [requires];
        this._setValue = setValue;
        makeObservable(this, {
            disabled: observable,
            error: computed,
            value: computed,
            isRequire: computed,
            setValue: action.bound,
            isValid: action.bound,
        }, {autoBind: true})
    }

    setValue(value: string, preventDefault = false) {
        try {
            this._setValue.v = value;
            this.notification.reset();

            if (!preventDefault) {
                this.dispatch('change')
            }
        } catch (err) {
            if (err instanceof ValueError) {
                this.notification.setMessage(err.message, err.type)
            }
        }
    }

    get value() {
        return this._setValue.v
    }


    isValid() {
        const value = this._setValue.v
        return !this.requires.some(validate => {
            if (!validate.isValid(value)) {
                this.notification.setMessage(validate.message, 'error')
            }
            return !validate.isValid(value)

        })

    }
    get isRequire() {
        return !!this.requires.length
    }

    get error() {

        return { type: this.notification.type, message: this.notification.message}
    }


}

export default ObjectValueInput