import { useGenres } from "../hooks/useGenres";

export function Header() {
  const { selectedGenre } = useGenres();

  return (
    <header>
      <span className="category">Categoria: <span>{selectedGenre.title}</span></span>
    </header>
  );
}