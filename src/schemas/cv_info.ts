export type CvInfo = {
    name: string;
    work_experience: WorkExperience[];
    educational_background: EducationalBackground[];
}

export type WorkExperience = {
    company: string;
    position: string;
    start_date: Date | null;
    end_date: Date | null;
    location: string;
}

export type EducationalBackground = {
    institution: string;
    area: string;
    study_type: string;
    start_date: Date | null;
    end_date: Date | null;
    location: string;
}