import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Card from '../components/CardX';
import UncontrolledExample from '../components/UnControlled';
import CarouselX from '../components/CarouselX';
import Carouselcat from '../components/Carouselcat';
import Restaurants from '../components/Restaurants';
import { getRestro } from '../service/GetRestro';
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import { validateToken } from '../service/AuthService';

const Home = () => {
  const [items, setItems] = useState([]); // Initialize items state with an empty array
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRestro(Cookies.get('token')); // Call your getRestro function to fetch the data
        setItems(data); // Set the retrieved data in the state
      } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    }


    async function validate(){

      try {
          
        const result = await validateToken(Cookies.get('token')); 
        if(result===true){
            navigate("/home");
        }else{
          navigate("/")
         
        }
       
      } catch (error) {
        navigate("/")
         

      }
      fetchData();
    }

    validate();

  },[]);

  return (
    <>
      <NavBar />
      <UncontrolledExample />
      <Carouselcat />
      <CarouselX />

      {items && items.length > 0 ? ( // Check if items is defined and has length
        <Restaurants items={items} />
      ) : (
        <div>Loading...</div> // Display a loading indicator or any other message while fetching the data
      )}
    </>
  );
};

export default Home;
