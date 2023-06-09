import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const UnControlled = () => {
  const urls = [
    {
      url:
        'https://blog.intercomassets.com/blog/wp-content/uploads/2020/06/MobileCarousel-ProductTour2.jpg.optimal.jpg',
    },
    {
      url:
        'https://carouselbuffet.com.sg/wp-content/uploads/sites/172/2021/03/Images-for-Carousel-New-Website-14-1.png',
    },
    {
      url:
        'https://sugdiwa.github.io/Restaurant/img/dosacarousel.jpg',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    
    <div className='max-w-[1400px] h-[500px] w-full m-auto py-6 px-4 relative group '>
      {console.log(urls[currentIndex].url)}
      <img
        src={urls[currentIndex].url}
        alt='img'
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-black mb-2'
      />

      <div className='hidden group-hover:block  absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 rounded-full p-3 bg-black/20 cursor-pointer text-white '>
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>

      <div className='hidden group-hover:block  absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 rounded-full p-3 bg-black/20 cursor-pointer text-white '>
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div>

      <div className='flex top-2 justify-center py-2'>
        {urls.map((url, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled size={10} />
          </div>
        ))}
      </div>
   
    </div>
  );
};

export default UnControlled;
