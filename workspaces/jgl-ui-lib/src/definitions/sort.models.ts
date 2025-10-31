/** Available types of sort. */
export type SortType = 'asc' | 'desc';

/** Sort properties. */
export interface SortProps {
    orderBy: string;
    direction: SortType;
}