import { useCallback, useMemo } from "react";
import { Button } from "../Button";
import './QuestionStatusButton.css'

type TQuestionStatusProps = {
    onClick: () => void,
    disabled?: boolean,
    status: 'success' | 'fail' | undefined,
    showSubmitButton?: boolean;
}

export default function QuestionStatusButton(props: TQuestionStatusProps) {

    const { showSubmitButton = false, disabled, status, onClick } = props;

    const QuestionStatusStatusClass = useMemo(() => {
        if (status === 'success') return 'QuestionStatusSuccess'
        else if (status === 'fail') return 'QuestionStatusFail'
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
        if (status === 'success') return 'Continue'
        else if (status === 'fail') return 'Submit'
        return 'Submit'
    }, [status])
    
    const renderButton = useCallback(() => {
        if (showSubmitButton) {
            return <Button dataTestID="button" variant={buttonVariant} disabled={disabled} label={buttonLabel} onClick={onClick} />
        }
        else if (status === 'success') {
           return <Button dataTestID="button" variant={buttonVariant} disabled={disabled} label={buttonLabel} onClick={onClick} />
        }
        return <></>

    }, [showSubmitButton, buttonVariant, disabled, buttonLabel, onClick, status])

    return (
        <div className={"QuestionStatusButton " + QuestionStatusStatusClass}>
            {renderStatusMessage()}
            {renderButton()}

        </div>
    )
}