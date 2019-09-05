import React from "react"
import Button from '../../../tfw/view/button'
import Random from '../../../tfw/random'

import "./answer.css"

interface IAnswerProps {
    question: string,
    answer: string,
    visible: boolean,
    onBackClick: () => void
}

const TITLE1 = [
    "Oups !", "Arg !", "Ho !", "Hum...", "My god !", "Diantre !",
    "Oh lala !", "Raté...", "Fichtre !", "WTF?", "Oh, oh...",
    "Niet !", "Bof..."
]
const TITLE2 = [
    "Essaie encore.", "Tu peux mieux faire.", "C'est presque ça...",
    "Faux !", "Je ne suis sûr...", "C'est faux.", "Pas loin !",
    "On y était presque.", "Retente ta chance.", "Perdu !",
    "Mais non...", "Ok, elle était dûre celle-là.", "C'est pas ça.",
    "On ne peut pas gagner à tous les coups.", "Pas vraiment."
]

export default class Answer extends React.Component<IAnswerProps, {}> {
    handleBackClick = () => {
        this.props.onBackClick();
    }

    render() {
        const { question, answer, visible } = this.props
        const className = `dummyPaces-view-Answer thm-bg2 ${visible ? "visible" : ""}`

        return (<div className={className}>
            <h1>{Random.pick(TITLE1)} {Random.pick(TITLE2)}</h1>
            <div className="question"><div>{question}</div></div>
            <div className="answer thm-ele-nav thm-bg0-7">{answer}</div>
            <div className="back">
                <Button label="J'ai compris..." icon="back" onClick={this.handleBackClick}/>
            </div>
        </div>)
    }
}
