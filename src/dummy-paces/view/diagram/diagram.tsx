import React from "react"

import "./diagram.css"

const INKSCAPE_LABEL_SELECTOR ='svg *[inkscape\\:label]'

interface IDiagramProps {
    htmlContent: string,
    itemToShow: string,
    onItemsChange: (items: string[]) => void
}

export default class Diagram extends React.Component<IDiagramProps, {}> {
    private readonly ref: React.RefObject<HTMLDivElement> = React.createRef();
    private lastHtmlContent: string = ""
    private highligthableItems: {[key: string]: HTMLElement} = {}

    componentDidMount() {
        this.refresh()
    }

    componentDidUpdate() {
        this.refresh()
    }

    refresh() {
        this.refreshSvg();
        window.setTimeout(() => this.highlightItem(), 20)
    }

    refreshSvg() {
        const { htmlContent } = this.props
        if (htmlContent === this.lastHtmlContent) return
        this.lastHtmlContent = htmlContent
        const div = this.ref.current
        if (!div) return
        div.innerHTML = htmlContent
        const items = div.querySelectorAll(INKSCAPE_LABEL_SELECTOR);
        const highligthableItems: {[key: string]: HTMLElement} = {}
        for (const item of items) {
            const label = item.getAttribute("inkscape:label")
            console.info("label=", label);
            if (!label) continue
            if (label.charAt(0) === '#') {
                highligthableItems[label.substr(1)] = item
                item.style.opacity = '0'
            }
        }
        this.props.onItemsChange(Object.keys(highligthableItems))
        this.highligthableItems = highligthableItems
    }

    highlightItem() {
        const names = Object.keys(this.highligthableItems)
        const { itemToShow } = this.props

        names.forEach((name: string) => {
            const item = this.highligthableItems[name]
            item.style.opacity = name === itemToShow ? '1' : '0'
        }, this)
    }

    render() {
        return (<div className="dummyPaces-view-Diagram" ref={this.ref}>
        </div>)
    }
}
