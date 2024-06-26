import './SpeechBubble.css';

export default function SpeechBubble({text}:{text:string;}) {
    return (
        <p className='SpeechBubble'>
            <span></span>
            {text}
        </p>
    )
}
