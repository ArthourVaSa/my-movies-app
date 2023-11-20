import { MovieEntity } from "../../entities/entities";

export interface LocalApiMovies {
    getMovies(): Promise<MovieEntity[]>;
}
