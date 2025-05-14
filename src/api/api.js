import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend URL

// Function to fetch data from the API
const getHello = async () => {
  try {
    const response = await axios.get(`${API_URL}/book/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API', error);
    throw error;
  }
};

export default getHello;  // Default export
