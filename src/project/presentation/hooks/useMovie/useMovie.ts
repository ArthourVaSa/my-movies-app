import { useEffect, useState } from "react";

import { MovieRepository } from "../../../domain/repository/MovieRepository";
import { MovieEntity } from "../../../domain/entities/entities";

export const useMovie = (movieRepository: MovieRepository) => {
  const [movies, setMovies] = useState<MovieEntity[]>([]);
  const [search, setSearch] = useState<string>("");
  const [genre, setGenre] = useState<string>("all");
  const [filteredMovies, setFilteredMovies] = useState<MovieEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    setLoading(true);
    setTimeout(() => {}, 3000);
    const response = await movieRepository.getMovies();
    setMovies(response);
    setFilteredMovies(response);
    setLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleGenre = (value: string) => {
    setGenre(value);

    if (value === "all") {
      setFilteredMovies(movies);
      return;
    }

    let initialFilteredMovies: MovieEntity[] = [];
    movies.forEach((movie) => {
      if (movie.genre.toLowerCase().includes(value.toLowerCase())) {
        initialFilteredMovies = [...initialFilteredMovies, movie];
      }
      setFilteredMovies(initialFilteredMovies);
    });
  };

  const filteredMoviesSearching = (moviesList: MovieEntity[]) => {
    if (search.length === 0 && genre === "all") {
      return movies;
    }

    let initialFilteredMovies: MovieEntity[] = [];

    moviesList.forEach((movie) => {
      if (movie.title.toLowerCase().includes(search.toLowerCase())) {
        initialFilteredMovies = [...initialFilteredMovies, movie];
      }

      if (
        movie.genre.toLowerCase().includes(search.toLowerCase()) &&
        genre !== "all"
      ) {
        initialFilteredMovies = [...initialFilteredMovies, movie];
      }

      if (movie.description.toLowerCase().includes(search.toLowerCase())) {
        initialFilteredMovies = [...initialFilteredMovies, movie];
      }
    });

    const filteredMoviesWithoutDuplicates: MovieEntity[] =
      initialFilteredMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );

    return filteredMoviesWithoutDuplicates;
  };

  return {
    loading,
    movies,
    filteredMovies,
    filteredMoviesSearching,
    handleSearch,
    handleGenre,
  };
};
