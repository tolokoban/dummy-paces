import React from "react"
import { IQuestion, ICategory } from '../types'
import Data from '../data'
import Question from '../view/question'
import Answer from '../view/answer'
import DiagramExam from '../view/diagram-exam'
import DiagramButton from '../view/diagram-button'
import Util from '../../tfw/util'
import Random from '../../tfw/random'

import "./app.css"

import DiagOs from '../data/diagrams/os.svg'
import DiagCilsVibratils from '../data/diagrams/cils-vibratiles.svg'
import DiagMendeleev from '../data/diagrams/mendeleev.svg'

const BUTTONS = [
    ["Tissus osseux", DiagOs],
    ["Cils vibratils", DiagCilsVibratils],
    ["Tableau périodique", DiagMendeleev]
]


interface IAppState {
    menuVisible: boolean,
    currentDiagramCode: string,
    currentDiagramItem: string,
    currentDiagramLabel: string
}

export default class App extends React.Component<{}, IAppState> {
    constructor( props: {} ) {
        super( props );

        this.state = {
            menuVisible: true,
            currentDiagramCode: "",
            currentDiagramItem: "",
            currentDiagramLabel: ""
        }
    }

    async componentDidMount() {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add("vanish");
            window.setTimeout(() => document.body.removeChild(splash), 600);
        }
    }

    handleDiagramItemsChange = (items: string[]) => {
        this.setState({ currentDiagramItem: Random.pick(items) })
    }

    handleButtonClick = (code: string, label: string) => {
        this.setState({
            menuVisible: false,
            currentDiagramCode: code,
            currentDiagramLabel: label
        })
    }

    handleBack = () => {
        this.setState({ menuVisible: true })
    }

    render() {
        const { menuVisible, currentDiagramCode, currentDiagramLabel } = this.state

        return (<div className="dummyPaces-App">{
            menuVisible ?
            <div className='buttons'>{
                BUTTONS.map((item: string[]) => {
                    const [label, url] = item
                    return <DiagramButton
                                key={label} label={label} url={url}
                                onClick={this.handleButtonClick} />
            })}</div> :
            <DiagramExam
                diagramCode={currentDiagramCode}
                diagramLabel={currentDiagramLabel}
                onBackClick={this.handleBack}/>
            }
        </div>)
    }
}
