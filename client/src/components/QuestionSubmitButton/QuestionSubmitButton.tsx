import { useCallback, useMemo } from "react";
import { Button } from "../Button";
import './QuestionSubmitButton.css'

type TQuestionSubmitProps = {
    onClick: () => void,
    disabled?: boolean,
    status?: 'success' | 'fail'
}

export default function QuestionSubmitButton(props: TQuestionSubmitProps) {

    const { disabled, status, onClick } = props;

    const QuestionSubmitStatusClass = useMemo(() => {
        if (status === 'success') return 'QuestionSubmitSuccess'
        else if (status === 'fail') return 'QuestionSubmitFail'
        return ''
    }, [status])

    const renderStatusMessage = useCallback(() => {
        if (status === 'success') return <h2>Excellent!</h2>
        else if (status === 'fail') return <h2 className="variant-danger">Wrong Answer!</h2>

    }, [status]);

    const buttonVariant = useMemo(() => {
        if (status === 'success') return 'primary'
        else if (status === 'fail') return 'danger'
        return 'primary'
    }, [status])

    const buttonLabel = useMemo(() => {
        if (status === 'success') return 'Next Question'
        else if (status === 'fail') return 'Submit'
        return 'Submit'
    }, [status])

    return (
        <div className={"QuestionSubmitButton " + QuestionSubmitStatusClass}>
            {renderStatusMessage()}
            <Button variant={buttonVariant} disabled={disabled} label={buttonLabel} onClick={onClick} />
        </div>
    )
}