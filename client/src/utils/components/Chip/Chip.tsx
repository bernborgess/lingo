import { useState } from 'react';
import './Chip.css'


type TChipProps = {
    onClick?: () => void;
    label: string;
    isSelected?:boolean
    dataTestID: string
}
export default function Chip(props:TChipProps){
    const {onClick, label, isSelected, dataTestID} = props;


    const [isLabelVisible, setIsLabelVisible] = useState<boolean>(true);

    function handleClick() {
        onClick?.();
        setIsLabelVisible(!isLabelVisible);
    }

    return(
        <span className={(isSelected) ? 'Chip-background-hidden' :'Chip-background-visible '} data-testID={dataTestID} onClick={handleClick}>
            <span className={(isSelected) ? 'Chip-body-hidden' :'Chip-body-visible'}>
                {label}
            </span>
        </span>
    )
}