import React, { useState, useEffect } from 'react';
import Character from '../components/Character';
import Loading from '../components/Loading';

function HomePage() {
  const [isLoading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023'
    )
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.data.results);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <h1 className="text-4xl font-bold tracking-tight">Marvel Characters</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {characters.map((character) => (
          <Character
            key={character.id}
            id={character.id}
            thumbnail={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            name={character.name}
            description={character.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
