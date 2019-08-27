import React from "react"

import { IData, IValuesPerLocation } from '../types'
import Data from '../data'
import Util from '../../tfw/util'
import Button from '../../tfw/view/button'
import Panel from '../view/panel'
import Scene from '../view/scene'
import Storage from '../../tfw/storage'
import Astrocyte from './svg/astrocyte.svg'
import Example from '../data/example.csv'
import "./app.css"

interface IAppState {
    genes: string[],
    selectedGenes: string[],
    valuesPerLocations: IValuesPerLocation[],
    data: IData
}

export default class App extends React.Component<{}, IAppState> {
    constructor( props: {} ) {
        super( props );
        this.state = {
            genes: [],
            selectedGenes: [],
            valuesPerLocations: [],
            data: { genes: {}, locations: {} }
        }
    }

    async componentDidMount() {
        const data = await loadData();
        this.setState({
            genes: Object.keys(data).sort(),
            selectedGenes: [],
            data
        })

        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add("vanish");
            window.setTimeout(() => document.body.removeChild(splash), 600);
        }
    }

    handleSelectedGenesChange = (selectedGenes: string[]) => {
        const { data } = this.state;
        this.setState({
            selectedGenes,
            valuesPerLocations: Data.getValuesPerLocations(data, selectedGenes) });
    }

    render() {
        const { data, selectedGenes, valuesPerLocations } = this.state;

        return (<div className="proteinAtlas-App thm-bg0">
            <Panel
                data={data}
                selectedGenes={selectedGenes}
                valuesPerLocations={valuesPerLocations}
                onSelectedGenesChange={this.handleSelectedGenesChange}/>
            <Scene url={Astrocyte} valuesPerLocations={valuesPerLocations}/>
            <header className="thm-ele-nav thm-bgPD">
                <div>Protein Atlas</div>
                <Button icon="import" small={true} warning={true} />
            </header>
        </div>)
    }
}


async function loadData() {
    const dataFromStorage = Storage.local.get("data", null);
    if (dataFromStorage) return dataFromStorage;
    
    const content = await Util.loadTextFromURL(Example);
    const data = Data.parse(content);
    Storage.local.get("data", data);
    return data;
}
