import React from 'react'

const CardX = (props) => {
  const {imageUrl,title,pt} = props;
  
  return (
    <div className='rounded-xl card bg-white w-[200px] h-[300px] mr-20  border-0 hover:shadow-xl cursor-pointer '>
        <img className='shadow rounded-xl w-[200px] h-[200px] object-cover' 
        src={imageUrl}
        alt="img" />
        {console.log(imageUrl)}
        <div className="bottom flex justify-center flex-col items-start p-3">
            <div className="title font-bold">
                {title} 
            </div>
            <p className='font-light text-xs'>{ pt}</p>
        </div>
      
      
    </div>
  )
}

export default CardX
