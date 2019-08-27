import React from "react"
import List from '../../../tfw/view/list'
import Touchable from '../../../tfw/view/touchable'

import "./gene-list.css"

interface IGeneListProps {
    genes: string[],
    selectedGenes: string[],
    onClick: (geneName: string) => void
}

export default class GeneList extends React.Component<IGeneListProps, {}> {
    mapper = (geneName: string) => {
        const { selectedGenes, onClick } = this.props;
        const selectionIndex = selectedGenes.indexOf(geneName);
        const selection = selectionIndex < 0 ? '' : `color-${selectionIndex}`

        return (<Touchable
                    key={geneName}
                    classNames={["gene", "thm-ele-button", selection]}
                    onClick={() => onClick(geneName)}>
                <div>{geneName}</div>
            </Touchable>)
    }

    render() {
        const { genes } = this.props;
        return (<List
            className="proteinAtlas-view-GeneList thm-bg0"
            items={genes}
            mapper={this.mapper}
            itemHeight={32}/>);
    }
}
