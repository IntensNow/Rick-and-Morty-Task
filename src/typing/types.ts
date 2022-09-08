export enum RequestStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    FAILED = 'failed'
}

export type Nullable<T> = T | null;

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    origin: { 
        name: string; 
    },
    image: string;
}