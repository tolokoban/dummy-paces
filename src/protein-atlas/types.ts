export interface IData {
    genes: {
        // Gene name.
        [key: string]: {
            // Location -> concentration
            [key: string]: number
        }
    },
    locations: {
        // Loction -> gene
        [key: string]: string[]
    }
}

export interface IValuesPerLocation {
    location: string,
    values: number[]
}
