import './Button.css'
type TButtonProps = {
    onClick: (arg: any) => void;
    label: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button = (props: TButtonProps) => {
    const { onClick, label, disabled, variant = 'primary' } = props;
    return (<button className={(disabled ? 'disabled-btn' : '') + ' variant-' + variant} disabled={disabled} onClick={onClick}>{label}</button>)
}

export { Button }