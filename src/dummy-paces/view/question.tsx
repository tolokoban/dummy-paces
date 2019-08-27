import React from "react"

import "./question.css"

interface IQuestionProps {
    
}

export default class Question extends React.Component<IQuestionProps, {}> {
    constructor( props: IQuestionProps ) {
        super( props );
    }

    render() {
        return (<div className="Question">
        </div>)
    }
}
