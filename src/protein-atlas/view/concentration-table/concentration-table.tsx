import React from "react"

import { IValuesPerLocation } from '../../types'
import Color from '../../../tfw/color'
import "./concentration-table.css"

const COLORS = [ new Color("#F77"), new Color("#7F7"), new Color("#77F") ]
const COLORS_WHITE = [ new Color("#FEE"), new Color("#EFE"), new Color("#EEF") ]

interface IConcentrationTableProps {
    selectedGenes: string[],
    valuesPerLocations: IValuesPerLocation[]
}

export default class ConcentrationTable extends React.Component<IConcentrationTableProps, {}> {
    render() {
        const { selectedGenes, valuesPerLocations } = this.props;

        if (selectedGenes.length === 0) return null;

        const { min, max } = computeBounds(valuesPerLocations);

        return (<div className="proteinAtlas-view-ConcentrationTable">{[
            <div key='__HEADER__' className='header'>{[
                <div/>,
                ...selectedGenes.map((gene: string) => (
                    <div>{gene}</div>
                ))
            ]}</div>,
            ...valuesPerLocations.map((valuesPerLocation: IValuesPerLocation) => {
                const { location, values } = valuesPerLocation;
                const concentrations = values.map((value: number, index: number) => {
                    const className = `col-${index}`
                    if (isNaN(value) || typeof value === 'undefined') {
                        return <div key={className} className={className}>{" "}</div>
                    } else {
                        const alpha = (value - min) / (max - min);
                        const color = Color.mix(COLORS_WHITE[index], COLORS[index], alpha);
                        return <div key={className}
                                    style={{ background: color.stringify() }}
                                    className={`${className} on`}>
                            <div>{
                            `${value}`
                            }</div>
                        </div>
                    }
                })
                return <div key={location}>{[
                    <div key="location" className="location">{location}</div>,
                    ...concentrations
                ]}</div>
            })
        ]}</div>)
    }
}


function computeBounds(valuesPerLocations: IValuesPerLocation[]): { min: number, max: number } {
    const bounds = { min: 0, max: 0 };
    let first = true;

    for (const valuesPerLocation of valuesPerLocations) {
        const { values } = valuesPerLocation;
        for (const value of values) {
            if (first) {
                bounds.min = value;
                bounds.max = value + 0.000000001;
                first = false;
            } else {
                bounds.min = Math.min( bounds.min, value );
                bounds.max = Math.max( bounds.max, value );
            }
        }
    }
    return bounds;
}
