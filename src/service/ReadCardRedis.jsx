import axios from 'axios';


export async function getBasketData(header) {
  const url = 'http://localhost:8060/restaurants/cart-read';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${header}`,
    // Add any additional headers as needed
  };

  try {
    const response = await axios.get(url,{ headers });

    console.log("redis" + response)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately
  }
}
