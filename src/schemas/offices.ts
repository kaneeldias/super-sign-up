export type Offices = MC[];

export type MC = {
    id: number;
    name: string;
    country_code: string;
    alignments: Alignment[];
}

export type Alignment = {
    id: number;
    value: string;
    alignment_id: number;
}