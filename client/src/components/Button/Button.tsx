import './Button.css'
type TButtonProps = {
    onClick: (arg:any) => void;
    label: string;
}

const Button = (props:TButtonProps) => {
    const {onClick, label} = props;
    return (<button onClick={onClick}>{label}</button>)
}

export { Button }