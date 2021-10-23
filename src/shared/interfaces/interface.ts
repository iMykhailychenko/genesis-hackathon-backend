export type Pagination<T> = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: T[];
};
