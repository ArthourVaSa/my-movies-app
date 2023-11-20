import * as React from "react";

import "./movie.css";

interface MovieProps {
  id: string;
  title: string;
  description: string;
  genre: string;
  image?: string;
}

const Movie: React.FC<MovieProps> = ({ id, title, description, genre, image }) => {
  return (
    <>
      <div className="movie-container">
        <img
          src={image}
          alt="Peli"
        />
        <div className="data-container">
          <article>
            <h3>Title</h3>
            <p>
              {title} {id}
            </p>
          </article>
          <article>
            <h3>Genre</h3>
            <p>
              {genre}
            </p>
          </article>
          <article className="description">
            <h3>Description</h3>
            <p>
              {description}
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

export default Movie;
