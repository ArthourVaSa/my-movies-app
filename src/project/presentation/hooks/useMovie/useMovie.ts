import { useEffect, useState } from "react";

import { MovieRepository } from "../../../domain/repository/MovieRepository";
import { Movie } from "../../../domain/entities/entities";
import { MovieEntity } from "../../../domain/entities/Movie";

export const useMovie = (movieRepository: MovieRepository) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [genre, setGenre] = useState<string>("all");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
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

  const filteredMoviesSearching = (moviesList: Movie[]) => {
    if (search.length === 0 && genre === "all") {
        // setFilteredMovies(movies);
      return movies
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

    // setFilteredMovies(filteredMoviesWithoutDuplicates);

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
