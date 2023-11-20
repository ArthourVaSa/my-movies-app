import { Header, Filter } from "../../components/components";
import Movie from "../../components/movie/Movie";
import { useMovie } from "../../hooks/Hooks";

import { MovieEntity } from "../../../domain/entities/Movie";
import { MovieRepositoryImpl } from "../../../infraestructure/repositories/MovieRepositoryImpl";

import "./movies_layaout.css";
import { MoviesApiLocalJson } from "../../../infraestructure/datasource/local/local_api_movies";

function MoviesLayout() {
  const moviesApiLocalJson = new MoviesApiLocalJson();
  const movieRepositoryImpl = new MovieRepositoryImpl(moviesApiLocalJson);

  const {
    loading,
    filteredMovies,
    handleGenre,
    handleSearch,
    filteredMoviesSearching,
  } = useMovie(movieRepositoryImpl);

  return (
    <>
      <Header></Header>
      <Filter
        onChange={(value) => {
          handleSearch(value);
        }}
        onFilter={(value) => {
          handleGenre(value);
        }}
      />
      <div className="movie-center_parent-container">
        <div className="movie-parent-container">
          {loading ? (
            <></>
          ) : (
            filteredMoviesSearching(filteredMovies).map((movie: MovieEntity) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.image}
                genre={movie.genre}
                description={movie.description}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MoviesLayout;
