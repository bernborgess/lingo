import { ChangeEventHandler } from 'react';
import './TextInput.css';

type TTextInputProps = {
    placeHolder?: string;
    icon?: JSX.Element;
    value: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;

}
const TextInput = (props: TTextInputProps) => {
    const { placeHolder, icon, value, type, onChange } = props;
    return (
        <div className='text-input-container'>
            {icon}
            <input onChange={onChange} value={value} type={type} placeholder={placeHolder} />
        </div>
    )
}

export { TextInput }