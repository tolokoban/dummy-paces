import React from "react"
import { IQuestion, ICategory } from '../types'
import Data from '../data'
import Question from '../view/question'
import Answer from '../view/answer'

import "./app.css"

interface IAppState {
    categories: ICategory[],
    currentCategory: ICategory,
    currentQuestionIndex: number,
    currentAnswer: string,
    answerVisible: boolean,
    answersCount: number,
    failuresCount: number
}

export default class App extends React.Component<{}, IAppState> {
    constructor( props: {} ) {
        super( props );

        this.state = {
            categories: [],
            currentCategory: {
                id: "",
                label: "",
                questions: []
            },
            currentQuestionIndex: 0,
            currentAnswer: "",
            answerVisible: false,
            answersCount: 0,
            failuresCount: 0
        }
    }

    nextQuestion() {
        const { categories } = this.state
        const currentCategory = categories[0]

        const currentQuestionIndex = Math.floor(
            Math.random() * currentCategory.questions.length
        )

        this.setState({
            currentCategory,
            currentQuestionIndex,
            currentAnswer: "",
            answerVisible: false
        })
    }

    componentDidMount() {
        const categories = Data.load();
        this.setState({
            categories,
            currentCategory: categories[0],
            currentQuestionIndex: Math.floor(
                Math.random() * categories[0].questions.length),
            answersCount: 0,
            failuresCount: 0
        })

        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add("vanish");
            window.setTimeout(() => document.body.removeChild(splash), 600);
        }
    }

    handleAbort = () => {}

    handleAnswer = () => {
        const {
            currentCategory, currentQuestionIndex, currentAnswer,
            answersCount, failuresCount
        } = this.state;
        const question = currentCategory.questions[currentQuestionIndex];
        const expectedAnswer = question.answer.toLowerCase();
        if (currentAnswer.toLowerCase() !== expectedAnswer) {
            this.setState({
                answerVisible: true, failuresCount: failuresCount + 1
            });
        }
        else {
            this.nextQuestion();
        }
        this.setState({ answersCount: answersCount + 1, currentAnswer: "" })
    }

    handleAnswerChange = (currentAnswer: string) => {
        this.setState({ currentAnswer });
    }

    handleCloseAnswer = () => {
        this.setState({ answerVisible: false })
    }

    render() {
        const {
            currentCategory, currentQuestionIndex, currentAnswer,
            answerVisible, answersCount, failuresCount
        } = this.state;
        if (!currentCategory) return null;
        if (currentCategory.questions.length === 0) return null;

        const question = currentCategory.questions[currentQuestionIndex];

        return (<div className="dummyPaces-App">
            <Question
                onAbort={this.handleAbort}
                onAnswer={this.handleAnswer}
                onAnswerChange={this.handleAnswerChange}
                answersCount={answersCount}
                questionIndex={currentQuestionIndex}
                failuresCount={failuresCount}
                isNumerical={false}
                category={currentCategory}
                answer={currentAnswer}/>
            <Answer
                visible={answerVisible}
                answer={question.answer}
                question={question.label}
                onBackClick={this.handleCloseAnswer}/>
        </div>)
    }
}
