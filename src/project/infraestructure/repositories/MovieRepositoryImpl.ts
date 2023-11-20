import { LocalApiMovies } from "../../domain/datasource/Datasource";
import { MovieEntity } from "../../domain/entities/entities";
import { MovieRepository } from "../../domain/repository/MovieRepository";

export class MovieRepositoryImpl implements MovieRepository {

    constructor(private readonly localApiMovies: LocalApiMovies) {}

    async getMovies(): Promise<MovieEntity[]> {
        return await this.localApiMovies.getMovies();
    }
}