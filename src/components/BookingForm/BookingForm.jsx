import { useEffect, useState } from 'react';
import './BookingForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const [movieName, setMovieName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seat, setSeat] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    const ticketDetails = localStorage.getItem('ticketDetails');
    if (ticketDetails) {
      const {
        movieName: storedMovieName,
        name: storedName,
        email: storedEmail,
        seat: storedSeat,
        quantity: storedQuantity,
        specialRequests: storedSpecialRequests,
      } = JSON.parse(ticketDetails);
      setMovieName(storedMovieName);
      setName(storedName);
      setEmail(storedEmail);
      setSeat(storedSeat);
      setQuantity(storedQuantity);
      setSpecialRequests(storedSpecialRequests);
    }
  }, []);
  
  useEffect(() => {
    const movieDetails = localStorage.getItem('movieDetails');
    if (movieDetails) {
      const { movieName } = JSON.parse(movieDetails);
      setMovieName(movieName);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data
    const formData = {
      movieName: movieName,
      name: name,
      email: email,
      seat: seat,
      quantity: quantity,
      specialRequests: specialRequests,
    };
    localStorage.setItem('ticketDetails', JSON.stringify(formData));
    toast.success('Booking Confirmed!', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'booking-toast',
    });
  };

  return (
    <div className="show-details booking-form">
      <ToastContainer />
      <h1>Booking Form</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="movieName">Movie Name: </label>
          <input type="text" id="movieName" value={movieName} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="seat-quantity">
          <div className="form-group">
            <label htmlFor="seat">Seat Selection: </label>
            <select
              id="seat"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
            >
              <option value="">Select a seat </option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Ticket Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests:</label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
