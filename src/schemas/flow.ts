export type Question = {
    question?: string,
    preText?: string ,
    answersType: "Product" | "YesNo" | "GTaSubProduct" | "Comment" | "Date" | "SDGSelection" | "ForceSignUp"
    options: Option[]
}

export type Option = {
    value: string,
    next: number
}

export type Flow = {
    [key: number]: Question
}