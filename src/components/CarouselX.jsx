import React,{useState} from 'react'
import CardX from './CardX'
import {BsChevronCompactLeft , BsChevronCompactRight} from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx';
const CarouselX = () => {

    const urls=[
        {
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },
        {
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },
        {
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },
        {
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },
        {
            url:'https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg',
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },{
            url:"https://thebigmansworld.com/wp-content/uploads/2022/10/butter-chicken-recipe.jpeg",
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex - 5 + urls.length) % urls.length;
        setCurrentIndex(newIndex);
      };
      
      const nextSlide = () => {
        const newIndex = (currentIndex + 5) % urls.length;
        setCurrentIndex(newIndex);
      };
      const goToSlide = (index) => {
        setCurrentIndex(index);
      };



  return (
    <div className='max-w-[1400px] relative m-auto py-6'>
        <div className='text-start py-4 px-4 text-xl font-bold'>Top Rated Restaurants</div>

        <div className='absolute right-0 top-5'>

            <button className='p-4 bg-white m-2 rounded-full hover:bg-black hover:text-white'>
                <BsChevronCompactLeft onClick={prevSlide}/>
            </button>
            <button className='p-4 bg-white m-2 rounded-full hover:text-black '>
                <BsChevronCompactRight onClick={nextSlide}/>
            </button>
            
        </div>

        <div className='carousel p-4 flex items-center justify-start overflow-x-auto scrollbar-hide'>
        {urls.slice(currentIndex, currentIndex + 5).map((item, index) => (
          <div key={index}>
            <CardX imageUrl={item.url} />
          </div>
        ))}
      </div>
      <div className='flex top-2 justify-center py-2'>
        {urls.map((_, slideIndex) => (
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
  )
}

export default CarouselX
