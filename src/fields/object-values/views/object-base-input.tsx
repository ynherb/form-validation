import {observer} from "mobx-react-lite";
import {BaseInput} from "../ui/input";
import ObjectValueInput from "../input/object-value-input";


import useScrollIntoView from "./hooks/use-scroll-into-view"


interface Props {
    objectValue: ObjectValueInput
    label: string
    placeholder?: string
    type: 'text' | 'file' | 'submit' | 'email' | 'number' | 'time',
}


const ObjectBaseInput = observer(({objectValue, label, placeholder = '', type = 'text'}: Props) => {

    const ref = useScrollIntoView(objectValue)
    return (
        <BaseInput
            ref={ref}
            value={objectValue.value}
            onChange={objectValue.setValue}
            onBlur={objectValue.isValid}
            label={label}
            isRequire={objectValue.isRequire}
            error={{type: objectValue.error.type, message: objectValue.error.message}}
            placeholder={placeholder}
            type={type}
        />
    )
})

export default ObjectBaseInput