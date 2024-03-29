import React from "react"
import Icon from '../../../tfw/view/icon'
import Input from '../../../tfw/view/input'
import Diagram from '../diagram'
import Rnd from '../../../tfw/random'
import Dialog from '../../../tfw/factory/dialog'

import "./diagram-exam.css"

interface IDiagramExamProps {
    diagramCode: string,
    diagramLabel: string,
    onBackClick: () => void
}

interface IDiagramExamState {
    attempts: number,
    successes: number,
    items: string[],
    solution: string,
    answer: string,
    failure: boolean
}

export default class DiagramExam extends React.Component<IDiagramExamProps, IDiagramExamState> {
    constructor( props: IDiagramExamProps ) {
        super( props );
        this.state = {
            attempts: 0,
            successes: 0,
            items: [],
            solution: '',
            answer: '',
            failure: false
        }
    }

    pickNewSolution(items: string[]) {
        const currentSolution = this.state.solution
        for (let i=0 ; i<10 ; i++) {
            const solution = Rnd.pick(items)
            if (solution !== currentSolution) return solution
        }
        return Rnd.pick(items)
    }

    handleAnswerChange = (answer: string) => {
        this.setState({ answer })
    }

    handleAnswer = (answer: string) => {
        if (answer.toLowerCase() === this.state.solution.toLowerCase()) {
            if (this.state.attempts === 19) {
                Dialog.alert(
                    <div><p>Votre score :</p><p><b>{this.state.successes} / 20</b></p></div>,
                    () => window.location.reload()
                )
            }
            const solution = this.pickNewSolution(this.state.items)
            this.setState({
                answer: '',
                attempts: this.state.attempts + 1,
                successes: this.state.successes + 1,
                solution
            })
        } else {
            this.setState({ failure: true })
        }
    }

    handleItemsChange = (items: string[]) => {
        const solution = this.pickNewSolution(items)
        console.info("solution=", solution);
        this.setState({
            items, attempts: 0, successes: 0,
            answer: '', solution
         })
    }

    handleErrorClick = () => {
        if (this.state.failure !== true) return;
        
        this.setState({
            attempts: this.state.attempts + 1,
            answer: '',
            failure: false
        })
    }

    handleBackClick = () => {
        this.props.onBackClick()
    }

    render() {
        const { diagramCode, diagramLabel } = this.props
        const { attempts, successes, solution, answer, failure } = this.state

        return (<div className="dummyPaces-view-DiagramExam">
            <header className="thm-bgPD">
                <Icon content="back" onClick={this.handleBackClick}/>
                <div className="title">{diagramLabel}</div>
                <div className="score">
                    <span className="score">{successes}</span>
                    <span className="separator"> / </span>
                    <span className="total">{attempts}</span>
                </div>
            </header>
            <Diagram
                htmlContent={diagramCode}
                itemToShow={solution}
                onItemsChange={this.handleItemsChange}/>
            <div className="answer">{
                failure ?
                <div className='error'
                    title="Cliquez pour fermer"
                    onClick={this.handleErrorClick}>{solution}</div> :
                <Input
                    focus={true}
                    onChange={this.handleAnswerChange}
                    onEnterPressed={this.handleAnswer}
                    type="text"
                    value={answer}
                    wide={true}
                    label="Nommez la partie du diagramme en orange"/>
            }</div>
        </div>)
    }
}
