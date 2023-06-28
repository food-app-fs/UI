import axios from 'axios';


export async function updateBasket(header, object) {
  const url = 'http://localhost:8060/restaurants/cart-update/qty';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${header}`,
    // Add any additional headers as needed
  };

  try {
    const response = await axios.post(url, object, { headers });

    console.log("redis" + response)
    return response;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately
  }

}

