import { useGenres } from "../hooks/useGenres";

import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

export function Content() {
 const { movies } = useGenres();
  return(
    <>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </>
  )
}