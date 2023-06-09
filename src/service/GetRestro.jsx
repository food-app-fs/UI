import axios from 'axios';

export async function getRestro(header) {
  const url = 'http://localhost:8060/restaurants/all';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${header}`,
    // Add any additional headers as needed
  };

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately
  }
}
