import React from 'react';
import { Link } from 'react-router-dom';

function Character({ id, thumbnail, name, description }) {
  const LIMIT_LENGTH = 125;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="aspect-w-1 aspect-h-1">
        <img
          src={thumbnail}
          alt={name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {!description ? (
          <p>Click the Detail button for more information.</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html:
                description.length > LIMIT_LENGTH
                  ? `${description.slice(0, LIMIT_LENGTH)}...`
                  : description,
            }}
          />
        )}
        <div className="card-actions justify-end mt-auto">
          <Link to={`/character/${id}`}>
            <button className="btn btn-primary">Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Character;
