import axios from 'axios';


export async function delreq(header, object) {
  const url = 'http://localhost:8060/restaurants/cart/clear-all';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${header}`,
    // Add any additional headers as needed
  };

  try {
    const response = await axios.post(url,  object , { headers });

    console.log("SUCCESS SUMMARY", response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately
  }
}

