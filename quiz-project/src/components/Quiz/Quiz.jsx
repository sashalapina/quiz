import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css'

export function Quiz() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [scoreDate, setScoreData] = useState({ score: null, total: null});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let getResourse = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Что-то пошло не так...");            
        }

        return await response.json();
    }

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);
        setTimeout(async () => {
            const updatedAnswers = [...answers, event.target.value];
            setAnswers(updatedAnswers);

            if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            }

            if (quiz && currentQuestionIndex === quiz.questions.length - 1) {
                const responseSubmit = await fetch(`https://peppercoding.ru/quiz/${id}/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ answers: updatedAnswers })
                });

                const responseScore = await responseSubmit.json();
                setScoreData({ score: responseScore.score, total: responseScore.total });
            }
        }, 300);
    };

    const handleGoToMainClick = () => {
        navigate('/');
    }

    useEffect(() => {
        if (!quiz) {
            let getQuestions = async () => {
                try {
                    const result = await getResourse(`https://peppercoding.ru/quiz/${id}`);
                    setQuiz(result);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }
            getQuestions();
        }
    }, [id, quiz]);

    if (isLoading) {
        return <div className='quiz-container loader'></div>
    }

    if (scoreDate.score !== null) {
        return (
                <div className='quiz-container'>
                    <h2 className='quiz-title'>{quiz.name}</h2>
                    <div className='quiz-score-container'>
                        <p className='quiz-score-text'>Вы отгадали: {scoreDate.score}/{scoreDate.total}</p>
                        <button className='quiz-exit-btn' onClick={handleGoToMainClick}>Играть снова</button>
                    </div>
                </div>
        )
    }

    return (
        <div className='quiz-container'>
            <h2 className='quiz-title'>{quiz.name}</h2>
                <div className='quiz-question-container'>
                    <div id="myProgress">
                        <div id="myBar" style={{
                    width: `${100 / quiz.questions.length * currentQuestionIndex}%`}}></div>
                    </div>
                    <h3 className='quiz-question-title'>{currentQuestionIndex + 1}. {quiz.questions[currentQuestionIndex].question}</h3>
                    <form className='quiz-form'>
                        <ul className='list-reset quiz-list'>
                            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        className='quiz-question-option-input'
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={selectedOption === option}
                                        onClick={handleOptionChange}
                                    />
                                    {option}
                                </label>
                            </li>
                            ))}
                        </ul>
                    </form>
                </div>
        </div>
    )
}

export default Quiz;