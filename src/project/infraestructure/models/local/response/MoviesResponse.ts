
export interface MoviesResponse {
    movies: DataMovie[];
    genres: string[];
}

export interface DataMovie {
    id: string;
    title: string;
    description: string;
    genre: string;
    image?: string;
}