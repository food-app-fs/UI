import React from 'react';
import CardX from './CardX';
import { useNavigate } from 'react-router-dom';



const Restaurants = ({ items }) => {
  console.log(items);
  const navigate = useNavigate();
  const handleClick = (pid) =>{
    navigate('/detail', {state:{id:pid}})
  }

  

  return (
    <div className='max-w-[1400px] relative m-auto py-6 '>
      <div className='text-start py-4 px-4 text-xl font-bold'>Restaurants in London</div>

      <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 p-4 flex items-center justify-start overflow-y-auto scrollbar-hide'>
        {items.map((restaurant) => {
          const { restaurantID, restaurantName, image , postcode } = restaurant;
          return (
            <div key={restaurantID} onClick={()=>handleClick(restaurantID)}>
              <CardX imageUrl={image} title={restaurantName} pt={postcode} />
            </div>
          );
        })}
      </div>
    </div>
  );


};

export default Restaurants;
