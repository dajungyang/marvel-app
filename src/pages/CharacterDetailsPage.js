import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

function CharacterDetailsPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(
      `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
    )
      .then((response) => response.json())
      .then((data) => setCharacter(data.data.results[0]))
      .catch((error) =>
        console.error('Error fetching character details:', error)
      );
  }, [id]);

  if (!character) {
    return <Loading />;
  }

  return (
    <div className="pt-6">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">
            {character.name}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
          <div className="space-y-6">
            {!character.description ? (
              <p>No information here.</p>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: character.description }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailsPage;
