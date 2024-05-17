import './Button.css'
type TButtonProps = {
    onClick: (arg:any) => void;
    label: string;
    disabled?:boolean;
}

const Button = (props:TButtonProps) => {
    const {onClick, label, disabled} = props;
    return (<button className={disabled ? 'disabled-btn': ''} disabled={disabled} onClick={onClick}>{label}</button>)
}

export { Button }