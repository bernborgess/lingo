import { useMemo } from "react";
import { Button } from "../Button";
import './QuestionSubmitButton.css'

type TQuestionSubmitProps = {
    onClick: () => void,
    disabled?: boolean,
    status?: 'complete' | 'fail'
}

export default function QuestionSubmitButton(props: TQuestionSubmitProps) {

    const { disabled, status, onClick } = props;

    const QuestionSubmitStatusClass = useMemo(() => {
        if (status === 'complete') return 'QuestionSubmitSuccess'
        else if (status === 'fail') return 'QuestionSubmitFail'
        return ''
    }, [status])

    return (
        <div className={"QuestionSubmitButton" + QuestionSubmitStatusClass}>
            <Button disabled={disabled} label="Submit" onClick={onClick} />
        </div>
    )
}