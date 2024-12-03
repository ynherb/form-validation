
import {CSSProperties, forwardRef, ReactNode} from "react";
import './input.scss'

interface Props {
    icon?: boolean,
    type: 'text' | 'file' | 'submit' | 'email' | 'number' | 'time',
    placeholder?: string,
    isRequire?: boolean
    label?: string
    onChange?: (value: string) => void,
    value?: string,

    onBlur?(): void

    error?: {
        type: 'error' | 'success' | 'warning' | null,
        message: string
    },
    style?: CSSProperties
    children?: ReactNode

}

export const BaseInput = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    const {
        type = 'text',
        placeholder = '',
        onChange,
        icon = false,
        value,
        label,
        error,
        children,
        style = {},
        onBlur = () => {
        },
    } = props;

    const errorInputClass = !!error?.type ? 'error_input' : '';

    return (
        <div className={`base_input ${errorInputClass}`} ref={ref}>
            <label htmlFor="">
                <div className="base_input__notice">
                    <span >{label}</span>
                </div>
                <div className="base_input__wrapper_input">
                    {children}
                    <input
                        style={style}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        className={`icon_${icon}`}
                        value={value}
                        type={type}
                        onBlur={onBlur}
                        placeholder={placeholder}
                    />
                </div>
                {!!error?.type && <span className="error_msg">{error?.message}</span>}
            </label>
        </div>
    )
})
BaseInput.displayName = 'BaseInput'

