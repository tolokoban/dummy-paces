export interface IQuestion {
    label: string,
    answer: string,
    asked: number,
    failed: number
}

export interface ICategory {
    id: number,
    parent: number,
    label: string,
    questions: IQuestion[]
}
