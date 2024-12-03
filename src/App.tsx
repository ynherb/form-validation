import ObjectBaseInput from "./fields/object-values/views/object-base-input";
import ObjectValueInput from "./fields/object-values/input/object-value-input";
import {useEffect, useState} from "react";
import {makeAutoObservable} from "mobx";

import {IsEmail, IsEmailOptional, IsRequire} from "./fields/object-values/input/validation";
import {SetValue, SetValueNumber} from "./fields/object-values/input/values";
import './App.css'

class FormValidation {

    fields: { [key in string]: ObjectValueInput } = {
        firstName: new ObjectValueInput(new IsRequire(), new SetValue()),
        email: new ObjectValueInput([new IsRequire(), new IsEmail()], new SetValue()),
        emailOptional: new ObjectValueInput([new IsEmailOptional()], new SetValue()),
        number: new ObjectValueInput([], new SetValueNumber()),
        preValidation: new ObjectValueInput([new IsRequire(), new IsEmail()], new SetValue()),
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    send() {
        const fields = Object.values(this.fields).filter(field => !field.isValid())

        if(!!fields.length) {
            fields[0].dispatch('scrollIntoView')
        }
    }
    init() {
        this.fields.preValidation.isValid()
    }
}

function App() {

    const [state] = useState(() => new FormValidation())

    useEffect(() => {
        state.init()
    }, [])
    return (
        <>
            <div>
                <ObjectBaseInput objectValue={state.fields.firstName} label="First Name" type="text"/>
                <ObjectBaseInput objectValue={state.fields.email} label="Email" type="text"/>
                <ObjectBaseInput objectValue={state.fields.emailOptional} label="Email Optional" type="text"/>
                <ObjectBaseInput objectValue={state.fields.number} label="Only Number" type="text"/>
                <ObjectBaseInput objectValue={state.fields.preValidation} label="Pre Valid" type="text"/>

                <button onClick={state.send}>Send</button>
            </div>

        </>
    )
}

export default App
