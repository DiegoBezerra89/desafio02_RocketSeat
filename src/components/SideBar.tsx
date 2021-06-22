import { Button } from './Button';

import { useGenres } from '../hooks/useGenres';

import '../styles/sidebar.scss';
import '../styles/global.scss';

export function SideBar() {
  const { selectedGenreId, handleClickButton, genres } = useGenres();
  
  return (
    <>
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
    </>
  );
}