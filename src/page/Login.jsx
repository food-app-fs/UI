import React,{useState,useEffect} from 'react'
import COVER_IMAGE from "../assets/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg"
import LoginService from '../service/LoginService'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { validateToken } from '../service/AuthService';

const color = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9"
}




const Login = () => {

    const [user, setUser] = useState({
        username: "",
        pwd: ""
      });

      const [isError, setIsError] = useState(false);
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
      };
      

      const navigate = useNavigate();

      const request = (e) => {

        console.log("clicked");
        e.preventDefault();

        LoginService.save(user)
          .then((response) => {
            console.log(response);
            navigate('/home');
          })
          .catch((e) => {
            console.log(e);
          });

      };

      useEffect(() => {
        async function fetchData() {
          try {
          
            const result = await validateToken(Cookies.get('token')); 
            if(result===true){
                navigate("/home");
            }else{
              throw new Error("Invalid token");
            }
           
          } catch (error) {
            setIsError(true);
          }
        }
        fetchData();
      }, [navigate]);

  return (
    <>
    <div className='w-full h-screen flex items-start overflow-y-hidden'>
        <div className='flex flex-col md:flex-row w-screen h-full'>
            <div className='w-screen h-[40vh] md:w-1/2 md:h-full flex flex-col shadow-2xl border-1 border-gray-200'>
                <div className="absolute top-[15%] md:top-[25%] left-[10%] md:left-[5%] flex flex-col ">
                    <h1 className='text-4xl sm:text-2xl text-white font-extrabold my-4 md:text-4xl shadow-2xl '>Taste the convenience</h1>
                    <p className='text-xl sm:text-lg md:text-2xl text-white font-semibold my-1'>Delivering flavors to your doorstep,<br /> one bite at a time </p>
                 </div>

                <img src={COVER_IMAGE} className='w-full h-full object-cover' alt="" />
            </div>

            <div className='w-full h-screen md:w-1/2  bg-[#f5f5f5] flex flex-col p-20 md:p-14 justify-between  items-center'>
                  
                    <div className='w-full flex flex-col max-w-[550px] mt-2'>
                        <div className='flex flex-col  w-full md:mb-2'>
                            <h3 className='text:xl md:text-2xl font-semibold mb-2'>Login</h3>
                            <p className="text-sm md:text-xl mb-2">Welcome Back! Please enter your details.</p>
                        </div>

                        <div className='w-full flex flex-col mb-1'>
                            <input 
                            name='username'
                            value={user.username}
                            onChange={(e)=>handleChange(e)}
                            type="email"
                            placeholder="Email"
                            className='w-full  md:py-2 bg-transparent my-2 text-black border-b border-black outline-none focus:outline-none' />

                            <input 
                            name='pwd'
                            value={user.pwd}
                            onChange={(e)=>handleChange(e)}
                            type="password"
                            placeholder="password"
                            className='w-full md:py-2 bg-transparent my-2 text-black border-b border-black outline-none focus:outline-none' />

                        </div>

                        <div className='w-full justify-between flex items-center mb-2 md:mb-4'>
                            <div className='w-full flex'>
                                <p className='text-sm font-medium whitespace-nowrap underline underline-offset-2 cursor-pointer'>Forgot Password ?</p>

                            </div>

                        </div>

                        <div className='w-full flex md:flex-col flex-row'>
                            <button onClick={request} className='w-auto md:w-full my-2 mr-4 md:mr-0 text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                                Log in
                            </button>
                            <button className='w-auto md:w-full my-2 border-2  text-black bg-white border-black rounded-md p-4 text-center flex items-center justify-center'>
                                Register
                            </button>

                        </div>


                        <div className='w-full items-center justify-center mt-5'>
                              <p className='text-sm font-normal text-[#060606]'>Dont have a account?<span className='font-semibold underline underline-offset-2'> Sign up for free</span></p>
                        </div>

                    </div>

                   
          
            </div> 

      
        </div>
    </div>
    </>
  )
}

export default Login
