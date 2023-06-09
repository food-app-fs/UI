import React from 'react'

const Roundcard = (props) => {
    const {imageurl} = props;
    const {name} = props;
  return (
   
    <div className='rounded-full card bg-transparent w-[150px] h-[150px] mr-20 border-0 cursor-pointer '>
        <img className='shadow rounded-full w-[150px] h-[150px] object-cover' 
        src={imageurl}
        alt="img" />
        {console.log(imageurl)}
        <div className="bottom flex justify-center flex-col items-start p-3">
            <div className="w-full text-center font-bold">
                {name}
            </div>
        </div>
      
        </div>
  
  )
}

export default Roundcard
