import { MovieEntity } from "../entities/entities";

export interface MovieRepository {
    getMovies(): Promise<MovieEntity[]>;
}