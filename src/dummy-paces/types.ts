export interface IQuestion {
    label: string,
    answer: string,
    asked: number,
    failed: number
}

export interface ICategory {
    id: string,
    parent?: string,
    label: string,
    questions: IQuestion[]
}
