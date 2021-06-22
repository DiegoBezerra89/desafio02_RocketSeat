import { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string,
    Value: string;
  }>;
  Runtime: string;
}

interface GenreProviderProps {
  children: ReactNode;
}

interface GenresContextData {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
}

export const GenresContext = createContext<GenresContextData>(
  {} as GenresContextData
);

export function GenresProvider({children}:  GenreProviderProps ) {
  const [ genres, setGenres ] = useState<GenreResponseProps[]>([]);
  const [ selectedGenreId, setSelectedGenreId ] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenresContext.Provider value={{ genres, handleClickButton, selectedGenreId, movies, selectedGenre }}>
      {children}
    </GenresContext.Provider>
  )
}

export function useGenres() {
  const context = useContext(GenresContext);
  return context;
}