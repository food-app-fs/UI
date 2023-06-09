import React,{useState} from 'react'
import {BsChevronCompactLeft , BsChevronCompactRight} from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx';
import Roundcard from './Roundcard';

const Carouselcat = () => {
    const cat= [
        {
            url:"https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
            name:"Pizza"
        },
        {
            url:"https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
            name:"burger"
        },
        {
            url:"https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
            name:"Biryani"
        },
        {
            url:"https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
            name:"Chicken"
        },

        {
            url:"https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
            name:"Rolls"
        },
        {
            url:"https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png",
            name:"Fried Rice"
        },
        {
            url:"https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png",
            name:"Cake"
        },
        {
            url:"https://b.zmtcdn.com/data/o2_assets/4c7697178c268c50e1b1641fca205c231634401116.png",
            name:"Ice Cream"
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex - 6 + cat.length) % cat.length;
        setCurrentIndex(newIndex);
      };
      
      const nextSlide = () => {
        const newIndex = (currentIndex + 6) % cat.length;
        setCurrentIndex(newIndex);
      };
      const goToSlide = (index) => {
        setCurrentIndex(index);
      };

  return (

    <div className='bg-gray-200 mt-10 '>

<div className='max-w-[1400px] relative m-auto py-6 px-4'>
        <div className='text-start px-4 py-4 text-xl font-bold'>Top Categories</div>

        <div className='absolute right-0 top-5'>

            <button className='p-4 bg-gray-200 m-2 rounded-full hover:bg-white'>
                <BsChevronCompactLeft onClick={prevSlide}/>
            </button>
            <button className='p-4 bg-gray-200 m-2 rounded-full hover:bg-white'>
                <BsChevronCompactRight onClick={nextSlide}/>
            </button>
            
        </div>

        <div className='carousel p-4 flex items-center justify-start overflow-x-auto scrollbar-hide'>
        {cat.slice(currentIndex, currentIndex + 6).map((item, index) => (
          <div key={index}>
            <Roundcard imageurl={item.url} name={item.name} />
          </div>
        ))}
      </div>
      <div className='flex top-2 justify-center py-2'>
        {cat.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled size={10} className={slideIndex === currentIndex ? 'text-blue-500' : ''} />
          </div>
        ))}
      </div>
      
    </div>
      


    </div>
  )
}

export default Carouselcat
