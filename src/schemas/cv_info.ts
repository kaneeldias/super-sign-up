export type CvInfo = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    work_experience: WorkExperience[];
    educational_background: EducationalBackground[];
}

export type WorkExperience = {
    company: string;
    employment_type: number;
    position: string;
    country: number | null;
    start_date: Date | null;
    end_date: Date | null;
    description: string;
}

export type EducationalBackground = {
    institution: string;
    area: string;
    study_type: string;
    start_date: Date | null;
    end_date: Date | null;
    location: string;
}