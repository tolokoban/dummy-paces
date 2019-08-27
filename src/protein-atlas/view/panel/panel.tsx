import React from "react"

import { IData, IValuesPerLocation } from '../../types'
import Data from '../../data'
import GeneList from '../gene-list'
import ConcentrationTable from '../concentration-table'
import Combo from '../../../tfw/view/combo'
import Input from '../../../tfw/view/input'
import Matcher from '../../../tool/matcher'

import "./panel.css"

interface IPanelProps {
    data: IData,
    selectedGenes: string[],
    valuesPerLocations: IValuesPerLocation[],
    onSelectedGenesChange: (selectedGenes: string[]) => void
}

interface IPanelState {
    filterGene: string,
    filteredGenes: string[],
    filterLocation: string
}

export default class Panel extends React.Component<IPanelProps, IPanelState> {
    constructor(props: IPanelProps) {
        super(props);
        this.state = {
            filterGene: "",
            filterLocation: "*",
            filteredGenes: []
        }
    }

    handleFilterGeneChange = (filterGene: string) => {
        this.setState({ filterGene });
    }

    handleFilterLocationChange = (filterLocation: string) => {
        this.setState({ filterLocation });
    }

    handleGeneClick = (geneName: string) => {
        const { selectedGenes, onSelectedGenesChange } = this.props;
        const geneIndex = selectedGenes.indexOf(geneName);
        const newSelectedGenes = selectedGenes.slice();

        if (geneIndex === -1 ) {
            // Add this gene to the current selection.
            newSelectedGenes.push(geneName);
            if (newSelectedGenes.length > 3) newSelectedGenes.shift();
        } else {
            newSelectedGenes.splice(geneIndex, 1);
        }
        onSelectedGenesChange(newSelectedGenes);
    }

    render() {
        const { data, selectedGenes, valuesPerLocations } = this.props;
        const { filterGene, filterLocation } = this.state;
        const genes = filterLocation === '*' ?
            Object.keys(data.genes).sort() : (data.locations[filterLocation] || [])
        const matcher = new Matcher(filterGene);
        const filteredGenes = genes.filter((name: string) => matcher.matches(name))

        return (<div className="proteinAtlas-view-Panel thm-bg1">
            <Combo value={filterLocation}
                   label="Show genes in..."
                   onChange={this.handleFilterLocationChange}>{
                [
                    <div key="*"><em>( any location )</em></div>,
                    ...Data.getLocationIds().map((id: string) => (
                        <div key={id}>{Data.getLocationName(id)}</div>
                    ))
                ]
            }</Combo>
            <Input wide={true}
                   value={filterGene}
                   onChange={this.handleFilterGeneChange}
                   label={`Filter by gene's name (${filteredGenes.length} / ${genes.length})`}/>
            <GeneList genes={filteredGenes}
                      onClick={this.handleGeneClick}
                      selectedGenes={selectedGenes} />
            <ConcentrationTable
                selectedGenes={selectedGenes}
                valuesPerLocations={valuesPerLocations} />
        </div>)
    }
}
