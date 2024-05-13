import './WriteThis.css';

import lily from '../../../assets/characters/lily.svg'
import SpeechBubble from '../../../components/SpeechBubble/SpeechBubble';
import Chip from '../../../components/Chip/Chip';

export default function WriteThis() {
    return (
        <div className='WriteThis'>
            <h1><b>Write This in English</b></h1>
            <div>
                <img src={lily} alt='lily' width={300} height={300}/>
                <SpeechBubble/>
            </div>
            <div>
                <Chip label='Hi' shouldHideLabelWhenClick/>
                <Chip label='my' />
            </div>
        </div>
    )
}
