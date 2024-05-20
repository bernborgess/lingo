import './LevelButton.css'

import EnableButtonLevel from '../../../assets/HomeIcons/EnableButtonLevel.svg'
import EnableClickedButtonLevel from '../../../assets/HomeIcons/EnableClickedLevel.svg'
import DisableButtonLevel from '../../../assets/HomeIcons/DisableButtonLevel.svg'
import { useState } from 'react'

type TLevelButtonProps = {
    enable?: boolean,
    onClick?: () => void,
}
export default function LevelButton(props: TLevelButtonProps) {

    const { enable = true, onClick } = props;


    const [isButtonDown, setIsButtonDown] = useState<boolean>(false);
    function handleClick() {

        setIsButtonDown(true);
        if (enable) onClick?.();
        setTimeout(() => setIsButtonDown(false), 100)
    }

    return (
        <div className={(enable ? 'LevelButton' : '')} onClick={handleClick}>
            <img style={{ display: isButtonDown ? 'none' : 'block' }} src={enable ? EnableButtonLevel : DisableButtonLevel} alt="" />
            <img style={{ display: isButtonDown ? 'block' : 'none' }} src={enable ? EnableClickedButtonLevel : DisableButtonLevel} alt="" />
        </div>
    )
}