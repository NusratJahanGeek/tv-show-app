import { useEffect, useState } from 'react';
import { fetchShows } from '../../providers/API';
import './ShowList.css';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      try {
        const showsData = await fetchShows();
        setShows(showsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getShows();
  }, []);

  return (
    <div className="show-list-container">
      <h1 className="list-header">Popular Shows</h1>
      <div className="show-card-container">
        {shows.map((entry) => (
          <div className="show-card" key={entry.show.id}>
            <h3>{entry.show.name}</h3>
            <img src={entry.show.image.original} alt="" />
            <p>Language: {entry.show.language}</p>
            {entry.show.rating.average ? (
              <p>Rating: {entry.show.rating.average}</p>
            ) : (
              <p className="no-rating">No rating available</p>
            )}
            <p>Genres: {entry.show.genres.join(', ')}</p>
            <Link to={`/summary/${entry.show.id}`}>
              <button>View Summary</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
