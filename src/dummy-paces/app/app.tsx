import React from "react"
import { IQuestion, ICategory } from '../types'
import Data from '../data'
import Question from '../view/question'
import Answer from '../view/answer'
import Diagram from '../view/diagram'
import Os from '../data/diagrams/os.svg'
import Util from '../../tfw/util'
import Random from '../../tfw/random'

import "./app.css"

interface IAppState {
    categories: ICategory[],
    currentCategory: ICategory,
    currentQuestionIndex: number,
    currentAnswer: string,
    answerVisible: boolean,
    answersCount: number,
    failuresCount: number,

    currentDiagramCode: string,
    currentDiagramItem: string
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
            failuresCount: 0,
            currentDiagramCode: "",
            currentDiagramItem: ""
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

    async componentDidMount() {
        const categories = Data.load();
        this.setState({
            categories,
            currentCategory: categories[0],
            currentQuestionIndex: Math.floor(
                Math.random() * categories[0].questions.length),
            answersCount: 0,
            failuresCount: 0
        })

        const currentDiagramCode = await Util.loadTextFromURL(Os)
        this.setState({ currentDiagramCode })

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

    handleDiagramItemsChange = (items: string[]) => {
        this.setState({ currentDiagramItem: Random.pick(items) })
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
            <Diagram htmlContent={this.state.currentDiagramCode}
                itemToShow={this.state.currentDiagramItem}
                onItemsChange={this.handleDiagramItemsChange}/>
            {/*
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
            */}
        </div>)
    }
}
