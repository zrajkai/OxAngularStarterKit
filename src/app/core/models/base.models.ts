export interface Base {
    id: number;
}

export interface Paginated {
    total: number;
    skip: number;
    limit: number;
    [propName: string]: unknown;
}
