import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
    imgURL: string;
    route: string;
    label: string;
}

export interface Tag {
    _id: string;
    name: string;
}

export interface Author {
    _id: string;
    name: string;
    picture: string;
}

export interface Question {
    _id: string;
    title: string;
    tags: Tag[];
    author: Author;
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
}
export interface Job {
    id?: string;
    employer_name?: string;
    employer_logo?: string | undefined;
    employer_website?: string;
    job_employment_type?: string;
    job_title?: string;
    job_description?: string;
    job_apply_link?: string;
    job_city?: string;
    job_state?: string;
    job_country?: string;
}

export interface Country {
    name: {
        common: string;
    };
}

export interface ParamsProps {
    params: { id: string };
}

export interface SearchParamsProps {
    searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
    params: { id: string };
    searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface FilterType {
    name: string;
    value: string;
}
