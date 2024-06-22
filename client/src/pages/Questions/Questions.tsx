import { useParams } from "react-router-dom";
import { useGetQuestion } from "./hooks/useGetQuestion";
import MultipleChoice from "./MultipleChoice/MultipleChoice";
import Ordering from "./Ordering/Ordering";

export default function Questions() {

    const { level, sequence } = useParams();
    const question = useGetQuestion(parseInt(level ?? ''), parseInt(sequence ?? ''));
    console.log(question);
    
    const renderQuestion = () => {
        if (question?.type === 'MultipleChoice') {
        return  <MultipleChoice phrase={question?.phrase} options={question?.options} />
        }
        if (question?.type === 'Ordering') {
            return <Ordering phrase={question?.phrase ?? ''} apiOptions={question?.options}/>
        }
        return <></>
    }
    
    return (renderQuestion())
}