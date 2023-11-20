import axios from "axios";

import { LocalApiMovies } from "../../../domain/datasource/Datasource";
import { MoviesResponse } from "../../models/models";
import { MovieEntity } from "../../../domain/entities/entities";

export class MoviesApiLocalJson implements LocalApiMovies {
  async getMovies(): Promise<MovieEntity[]> {
    let moviesResponse: MoviesResponse;
    try {
        const response = await axios.get("movies.json");
        // const response = await axios.get("../../../../assets/movies.json");
      moviesResponse = response.data as MoviesResponse;
      return transformMoviesResponseToMovies(moviesResponse);
    } catch (error) {
        throw new Error();
    }
  }
}

const transformMoviesResponseToMovies = (moviesResponse: MoviesResponse): MovieEntity[] => {
  const movies: MovieEntity[] = moviesResponse.movies.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      image: movie.image,
    };
  });
  return movies;
}
