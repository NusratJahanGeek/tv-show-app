import axios from 'axios';

export const fetchShows = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};