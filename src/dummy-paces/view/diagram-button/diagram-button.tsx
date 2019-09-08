import React from "react"
import Util from '../../../tfw/util'

import "./diagram-button.css"

interface IDiagramButtonProps {
    url: string,
    label: string,
    onClick: (code: string, label: string) => void
}

interface IDiagramButtonState {
    code: string
}

export default class DiagramButton extends React.Component<IDiagramButtonProps, IDiagramButtonState> {
    constructor( props: IDiagramButtonProps ) {
        super( props );
        this.state = { code: '' }
    }

    async componentDidMount() {
        const code = await Util.loadTextFromURL(this.props.url)
        this.setState({ code })
    }

    handleClick = () => {
        this.props.onClick(this.state.code, this.props.label)
    }

    render() {
        const classes = ['dummyPaces-view-DiagramButton']
        const { code } = this.state
        if (code.length === 0) {
            classes.push('hide')
        }
        const { url, label } = this.props
        return (<div className={classes.join(' ')} onClick={this.handleClick}>
            <img className="thm-ele-nav thm-bg2" src={url} />
            <div>{label}</div>
        </div>)
    }
}
