export type Opportunity = {
    id: number;
    title: string;
    location: string;
    skills: {
        constant_id: number;
    }[];
    backgrounds: {
        constant_id: number;
    }[];
}

