import { Movie } from "../entities/entities";

export interface MovieRepository {
    getMovies(): Promise<Movie[]>;
}