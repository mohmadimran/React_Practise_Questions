import { useState } from "react";

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Python", "C++", "Java", "JavaScript"],
        answer: "JavaScript",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        answer: "Cascading Style Sheets",
    },
];

export default function QueizApp() {
    const [current, setCurrent] = useState(0)
    const [category, setCategory] = useState(null)
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false)


    const handleChange = (list) => {
        setCategory(list)
    }
    const handleNext = () => {
        if (category === questions[current].answer) {
            setScore(prev => prev + 1)
        }
        setCategory(null);

        if (current + 1 < questions.length) {
            setCurrent(prev => prev + 1)
        }
        else {
            setFinished(true)
        }
    }

    const handleReset = () => {
        setCurrent(0);
        setCategory(null);
        setScore(0);
        setFinished(false)
    }
    return (
        <>
            {!finished ? (<div>
                <h1>{questions[current].question}</h1>
                <div>
                    {questions[current].options.map((list, index) => (
                        <label key={index}>
                            <input type="radio" value={list} onChange={() => handleChange(list)}
                                checked={category === list}
                                name={`question-${list}`}
                            />
                            {list}
                        </label>
                    ))}
                </div>
                <button type="button"
                    disabled={!category}
                    onClick={handleNext}>{current === questions.length - 1 ? "finish" : "next"}</button>
            </div>
            ) : (<>
                <h1> the score is : {`${score}/${questions.length}`}</h1>
                <button onClick={handleReset}>reset</button>
            </>)}


        </>
    )
}