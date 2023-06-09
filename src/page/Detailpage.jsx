import React,{useEffect, useState} from "react";
import NavBar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Menutable from "../components/Menutable";
import {useLocation,  useNavigate} from 'react-router-dom';
import { getindetail } from "../service/GetMenu";
import Cookies from "js-cookie";
import { validateToken } from "../service/AuthService";


const Detail = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
 
 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getindetail(Cookies.get('token'),location.state.id); // Call your getRestro function to fetch the data
        setitems(data); // Set the retrieved data in the state
        console.log("date" + items);
      } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    }


    async function validate(){

      try {
          
        const result = await validateToken(Cookies.get('token')); 
        if(result===true){
            navigate("/detail");
        }else{
          navigate("/");
      
        }
       
      } catch (error) {
        navigate("/");

      }
      fetchData();
    }

    validate();

  },[]);







  return (
    <>
      <NavBar />
      <div className="px-5">
        {/* image */}
        <div className=" mt-3 w-full h-[350px] shadow-xl">
          <img
            className="h-[350px] w-full object-cover"
            src={items.image}
            // "https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg.webp"
            alt=""
          />
        </div>

        {/* name */}

        <div className="mt-2 w-full h-[250px] md:h-[100px] flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-4xl font-bold md:text-3xl">{items.restaurantName}</h1>
            <p className="text-lg font-semibold text-gray-500">
              {items.address + " " + items.postcode}
            </p>
          </div>

          <div className="flex flex-col w-1/2 ">
            <p className="text-lg font-semibold text-gray-500">
              {"open time: " + items.timing} 
            </p>
            <p className="text-lg font-semibold text-gray-500">
              contact: {items.contact}
            </p>
          </div>
        </div>

        <div className="w-full h-[2px] mt-2 bg-black"></div>

        {/*            */}
        <div className=" px-4 py-2 mt-5 flex flex-col md:flex-row">
          <div className="w-1/2 flex justify-center md:justify-start items-start md:items-center md:mr-4">
            <p className="font-semibold text-2xl text-black">order online</p>
          </div>

          <div className=" w-1/2 flex justify-center md:justify-end items-center mt-2 md:mt-0">
            <Form className="flex">
              <Form.Control
                type="search"
                placeholder="Search within menu"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>

        </div>

        <div className="px-4 py-2">
        {console.log(items.menu)}
        {items.menu && items.menu.length > 0 ? ( // Check if items is defined and has length
        <Menutable menu={items.menu}/>
      ) : (
        <div>Loading...</div> // Display a loading indicator or any other message while fetching the data
      )}
        
        </div>

       
      </div>
    </>
  );
};

export default Detail;
