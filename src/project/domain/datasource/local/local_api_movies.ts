import { Movie } from "../../entities/entities";

export interface LocalApiMovies {
    getMovies(): Promise<Movie[]>;
}
