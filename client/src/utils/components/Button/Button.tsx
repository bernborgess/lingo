import './Button.css'
type TButtonProps = {
    onClick: (arg: any) => void;
    label: string;
    disabled?: boolean;
    dataTestID: string;
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button = (props: TButtonProps) => {
    const { onClick, label, disabled, dataTestID, variant = 'primary' } = props;
    return (<button  data-testID={dataTestID} className={(disabled ? 'disabled-btn' : '') + ' variant-' + variant} disabled={disabled} onClick={onClick}>{label}</button>)
}

export { Button }