import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShows } from "../../providers/API";
import "./ShowSummary.css";

const ShowSummary = () => {
  const { id } = useParams();
  const [, setShows] = useState([]);
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");
  const [url, setUrl] = useState("");
  const [averageRuntime, setAverageRuntime] = useState(0);
  const [premiered, setPremiered] = useState("");
  const [ended, setEnded] = useState("");
  const [showType, setShowType] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchShowsData();
  }, []);

  async function fetchShowsData() {
    try {
      const showsData = await fetchShows();
      setShows(showsData);
      const selectedShow = showsData.find(
        (show) => show.show.id === parseInt(id)
      );
      setName(selectedShow?.show?.name || "");
      setSummary(selectedShow?.show?.summary || "");
      setGenre(selectedShow?.show?.genres?.join(", ") || "");
      setUrl(selectedShow?.show?.officialSite || "");
      setAverageRuntime(selectedShow?.show?.averageRuntime || 0);
      setPremiered(selectedShow?.show?.premiered || "");
      setEnded(selectedShow?.show?.ended || "");
      setShowType(selectedShow?.show?.type || "");
      setImage(selectedShow?.show?.image?.original || "");
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  }

  const handleBookTicket = () => {
    const movieName = name; 
    const movieDetails = {
      movieId: id, 
      movieName: movieName,
    };
  
    localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
    navigate("/booking"); 
  };
  

  return (
    <div>
      <div className="show-summary">
        {image && <img src={image} alt={name} className="show-image" />}
        <div className="show-title">
          <h1>
            {name} | <span>{genre}</span>
          </h1>
          <button onClick={handleBookTicket} className="book-button">
            Book Ticket
          </button>
        </div>
        <p>
          {" "}
          Show Type: {showType} | Average Runtime: {averageRuntime} minutes
        </p>
        <hr />
        {url && (
          <p>
            Official Site: <a href={url}>{url}</a>
          </p>
        )}
        <p>
          Premiered: {premiered} {ended && <span>to {ended}</span>}
        </p>
      </div>
      <div className="show-details">
        <p className="summary">
          <b>Summary:</b> <span dangerouslySetInnerHTML={{ __html: summary }} />
        </p>
      </div>
    </div>
  );
};

export default ShowSummary;
