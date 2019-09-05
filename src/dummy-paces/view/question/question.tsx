import React from "react"
import { ICategory, IQuestion } from '../../types'
import Icon from '../../../tfw/view/icon'
import Input from '../../../tfw/view/input'

import "./question.css"

interface IQuestionProps {
    answer: string,
    category: ICategory,
    isNumerical: boolean,
    questionIndex: number,
    answersCount: number,
    failuresCount: number,
    onAbort: () => void,
    onAnswer: () => void,
    onAnswerChange: (answer: string) => void
}

export default class Question extends React.Component<IQuestionProps, {}> {
    handleAnswerChange = (answer: string) => {
        this.props.onAnswerChange(answer);
    }

    handleAnswer = () => {
        this.props.onAnswer();
    }

    render() {
        const {
            category, answer, questionIndex, answersCount, failuresCount, isNumerical
        } = this.props;
        const score  = answersCount - failuresCount;
        const question = category.questions[questionIndex];

        if (!question) {
            console.error(`The category "${category.label}" has no question #${questionIndex}!`)
        }

        return (<div className="dummyPaces-view-Question">
            <header className="thm-bgPD">
                <Icon content="back" />
                <div className="title">{category.label}</div>
                <div className="score">
                    <span className="score">{score}</span>
                    <span className="separator"> / </span>
                    <span className="total">{answersCount}</span>
                </div>
            </header>
            <div className="question">
                <div>{question.label}</div>
            </div>
            <div className="answer">
                <Input
                    focus={true}
                    onChange={this.handleAnswerChange}
                    onEnterPressed={this.handleAnswer}
                    type={isNumerical ? "number" : "text"}
                    value={answer}
                    wide={true}
                    label="Your answer"/>
            </div>
        </div>)
    }
}
