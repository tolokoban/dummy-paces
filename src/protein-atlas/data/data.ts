import { IData, IValuesPerLocation } from '../types'
import Iterator from '../../tfw/iterator'
import CSV from '../../tfw/parser/csv'


export default {
    getLocationIds, getLocationNames, getLocationName, getValuesPerLocations, loadFromFile, parse, parseCSV
}


const LOCATIONS: { [key: string]: string } = {
    "actin binding proteins": "Actin binding proteins",
    "astrocytes": "Astrocytes",
    "axon": "Axon",
    "cytoplasm": "Cytoplasm",
    "endosome": "Cndosome",
    "er": "er",
    "er_high_curvature": "er_high_curvature",
    "ergic/cisgolgi": "Ergic / Cisgolgi",
    "golgi": "Golgi",
    "large protein complex": "Large protein complex",
    "lysosome": "Lysosome",
    "mitochondria": "Mitochondria",
    "neurons": "Neurons",
    "nuclear pore complex/nuclear": "Nuclear pore complex / nuclear",
    "peroxisome": "Peroxisome",
    "plasma membrane": "Plasma membrane"
    //"subcellular,not specified": "subcellular,not specified"
}

/**
 * Return a table. Rows are locations and columns are genes.
 * The cells are concentration or undefined.
 *
 * Return type `{ location: string, values: number[] }[]`
 */
function getValuesPerLocations(data: IData, genes: string[]): IValuesPerLocation[] {
    const locations = getLocationsUnion(data, genes);
    return locations.map((location: string) => ({
        location,
        values: genes.map((gene: string) => data.genes[gene][location])
    }));
}

/**
 * Return an array of all the locations that have a concentration defined.
 */
function getLocationsUnion(data: IData, genes: string[]): string[] {
    const locationsUnion = new Set<string>();
    for (const gene of genes) {
        const geneData = data.genes[gene];
        if (!geneData) continue;
        const locations = Object.keys(geneData);
        for (const location of locations) {
            locationsUnion.add(location);
        }
    }
    return [...locationsUnion];
}

function loadFromFile() {

}


function parse(content: string): IData {
    const table = parseCSV(content);
    const data: IData = {
        genes: {}, locations: {}
    };
    const acceptedLocations = getLocationIds();

    for (let i = 1; i < table.length; i++) {
        const row = table[i]
        const gene = row[1];
        const location = row[2];
        if (acceptedLocations.indexOf(location) === -1) continue;
        const concentration = parseFloat(row[4]);
        if (typeof data.genes[gene] === 'undefined') {
            data.genes[gene] = {};
        }
        data.genes[gene][`${location}`] = concentration;

        if (typeof data.locations[location] === 'undefined') {
            data.locations[location] = [gene];
        }
        else if (data.locations[location].indexOf(gene) === -1) {
            data.locations[location].push(gene);
        }
    }

    console.log("data =", data);
    return data;
}

// Common CSV separators.
const SEPARATORS = [',', ';', '|', ' ', '\t'];

/**
 * Columns are not always separated by a comma in a CSV file.
 * We will try to figure out what separator is used.
 */
function parseCSV(content: string): string[][] {
    const rows = [];
    const itr = Iterator.lines(content);
    for (const line of itr) {
        if (line.trim().length > 0) {
            rows.push(parseLine(line))
        }
    }
    if (rows.length === 0) return [];

    const tables = extractTables(rows)
        .filter(consistentNumberOfColumns);
    if (tables.length === 0) return [];

    let bestTable = tables[0];
    let bestColumnsNumber = bestTable[0].length;
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        if (table.length > 0) {
            const columnsCount = table[0].length;
            if (columnsCount > bestColumnsNumber) {
                bestColumnsNumber = columnsCount;
                bestTable = table;
            }
        }
    }
    // First table in the one with the more columns.
    return bestTable;
}


function parseLine(line: string): string[][] {
    return SEPARATORS.map((sep: string) => CSV.splitColumns(line, sep));
}


function extractTables(rows: string[][][]): string[][][] {
    const tables: string[][][] = [];
    for (let i = 0; i < SEPARATORS.length; i++) {
        const table: string[][] = rows
            .filter((row: string[][]) => row.length > 0)
            .map((row: string[][]) => row[i]);
        tables.push(table);
    }

    return tables;
}


function consistentNumberOfColumns(table: string[][]): boolean {
    if (table.length === 0) return false;
    const firstRow = table[0];
    const columnsCount = firstRow.length;
    for (let i = 1; i < table.length; i++) {
        const row = table[i];
        if (row.length !== columnsCount) return false;
    }
    return true;
}


function getLocationIds() {
    return Object.keys(LOCATIONS);
}


function getLocationNames() {
    return Object.values(LOCATIONS);
}

function getLocationName(id: string): string {
    return LOCATIONS[id] || "";
}
