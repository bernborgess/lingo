import { useState } from 'react';
import './Chip.css'


type TChipProps = {
    onClick?: () => void;
    label: string;
    shouldHideLabelWhenClick?: boolean;
}
export default function Chip(props:TChipProps){
    const {onClick, label, shouldHideLabelWhenClick} = props;


    const [isLabelVisible, setIsLabelVisible] = useState<boolean>(true);

    function handleClick() {
        onClick?.();
        setIsLabelVisible(!isLabelVisible);
    }

    return(
        <span className={(!isLabelVisible && shouldHideLabelWhenClick) ? 'Chip-background-hidden' :'Chip-background-visible '} onClick={handleClick}>
            <span className={(!isLabelVisible && shouldHideLabelWhenClick) ? 'Chip-body-hidden' :'Chip-body-visible'}>
                {label}
            </span>
        </span>
    )
}