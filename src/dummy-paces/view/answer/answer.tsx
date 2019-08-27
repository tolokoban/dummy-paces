import React from "react"
import Button from '../../../tfw/view/button'

import "./answer.css"

interface IAnswerProps {
    question: string,
    answer: string,
    visible: boolean,
    onBackClick: () => void
}

export default class Answer extends React.Component<IAnswerProps, {}> {
    handleBackClick = () => {
        this.props.onBackClick();
    }

    render() {
        const { question, answer, visible } = this.props
        const className = `dummyPaces-view-Answer thm-bg2 ${visible ? "visible" : ""}`

        return (<div className={className}>
            <div className="question"><div>{question}</div></div>
            <div className="answer thm-ele-nav thm-bg0-7">{answer}</div>
            <div className="back">
                <Button label="J'ai compris..." icon="back" onClick={this.handleBackClick}/>
            </div>
        </div>)
    }
}
