import React from "react"

import { IValuesPerLocation } from '../../types'
import Util from '../../../tfw/util'
import Data from '../../data'

import "./scene.css"

interface ISceneProps {
    // URL of the SVG content.
    url: string,
    valuesPerLocations: IValuesPerLocation[]
}

interface ILayer {
    location: string,
    element: HTMLOrSVGElement
}

export default class Scene extends React.Component<ISceneProps, {}> {
    private readonly ref: React.RefObject<HTMLDivElement> = React.createRef();
    private fillLayers: ILayer[] = [];
    private labelLayers: ILayer[] = [];

    async componentDidMount() {
        const div = this.ref.current;
        if (!div) return;
        const svgCode = await Util.loadTextFromURL(this.props.url);
        div.innerHTML = svgCode;

        const layersToSave: {
            [key: string]: ILayer[]
        } = { fill: [], label: [] };

        const layers = div.querySelectorAll("svg > g");
        for (let i=0 ; i<layers.length ; i++) {
            const layer = layers[i];
            const id = layer.getAttribute('id');
            if (!id) continue;
            for (const suffix of Object.keys(layersToSave)) {
                if (!id.toLowerCase().endsWith(`_${suffix}`)) continue;
                const locationId = id.substr(0, id.length - suffix.length - 1);
                const locationName = Data.getLocationName(locationId);
                if (!locationName) {
                    console.warn(`SVG layer not related to an accepted location!`)
                    console.warn(`   >>> id=`, id)
                    console.warn(`   >>> url=`, this.props.url)
                    layer.style.opacity = 0
                    continue;
                }
                layersToSave[suffix].push({ location: locationId, element: layer });
            }
        }

        this.fillLayers = layersToSave.fill;
        this.labelLayers = layersToSave.label;

        this.refresh()
    }

    componentDidUpdate() {
        this.refresh();
    }

    /**
     * Show/hide labels depending on the selected locations.
     */
    refresh() {
        this.refreshLabels();
        this.refreshFills();
    }

    refreshLabels() {
        const layers = this.labelLayers;
        const locations = this.props.valuesPerLocations.map(v => v.location);

        for (const layer of layers) {
            const { location, element } = layer;
            console.log("location (LABEL)=", location, locations.indexOf(location));

            if (locations.indexOf(location) === -1) {
                element.style.opacity = 0;
            }
            else {
                element.style.opacity = 1;
            }
        }
    }

    refreshFills() {
        const layers = this.fillLayers;
        const locations = this.props.valuesPerLocations.map(v => v.location);

        for (const layer of layers) {
            const { location, element } = layer;
            console.log("location (FILL)=", location, locations.indexOf(location));

            if (locations.indexOf(location) === -1) {
                element.style.opacity = 0;
            }
            else {
                element.style.opacity = 1;
            }
        }
    }

    render() {
        return (<div className="proteinAtlas-view-Scene" ref={this.ref}>
            <div>Loading...</div>
        </div>)
    }
}
