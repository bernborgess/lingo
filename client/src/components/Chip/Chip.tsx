import { useState } from 'react';
import './Chip.css'


type TChipProps = {
    onClick?: () => void;
    label: string;
    isSelected?:boolean
}
export default function Chip(props:TChipProps){
    const {onClick, label, isSelected} = props;


    const [isLabelVisible, setIsLabelVisible] = useState<boolean>(true);

    function handleClick() {
        onClick?.();
        setIsLabelVisible(!isLabelVisible);
    }

    return(
        <span className={(isSelected) ? 'Chip-background-hidden' :'Chip-background-visible '} onClick={handleClick}>
            <span className={(isSelected) ? 'Chip-body-hidden' :'Chip-body-visible'}>
                {label}
            </span>
        </span>
    )
}