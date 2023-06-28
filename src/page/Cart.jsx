import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { validateToken } from "../service/AuthService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getBasketData } from "../service/ReadCardRedis";
import { updateBasket } from "../service/UpdateCart";
import { delItem } from "../service/Del";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { successordersummary } from "../service/Successorder";
import {delreq} from "../service/Delredis"




const stripePublicKey =
  "pk_test_51NIcknISk3dUEhPoTK1xeLAUxUIy9arsQcyytNvLEEogR5dR4vrT6j2Wde2xllkBnb1yAfK9K8bwS064i2dCufgE00h7XPyA2V";
  

const Cart = () => {
  const navigate = useNavigate();

  const stripe = useStripe();

  const elements = useElements();

  const [data, setdata] = useState([]);
  const [totalprice, settotalprice] = useState(0);
  const [totalitem, settotalitem] = useState(0);

  const handleClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const dt = await getBasketData(Cookies.get("token"));
        setdata(dt);
        settotalitem(dt.length);

        const totalPrice = dt.reduce((accumulator, item) => {
          const { qty, produtPrice } = item;
          return accumulator + qty * produtPrice;
        }, 0);

        console.log("price" + totalPrice);

        settotalprice(totalPrice.toFixed(2));

        console.log("data" + dt);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function validate() {
      try {
        const result = await validateToken(Cookies.get("token"));
        if (result === true) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
      fetchData();
    }

    validate();
  }, []);
  

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8060/stripe/create-payment-intent",
        {
          method: "POST",
          body: JSON.stringify({ amount: totalprice }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const clientSecret = await response.text();
      console.log("clientSecret:", clientSecret);

      // Retrieve the card element
      const cardElement = elements.getElement(CardElement);

      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              //
            },
          },
        })
        .then((result) => {
          if (result.error) {
            console.error(result.error.message);
          } else {
            console.log("Payment succeeded!");

            getdata();


            // pass the data to the previous view order db 
            // private long uuid;

            // private List<Long> product_ID;
            
            // private List<Integer> qty;
            
            // private long totalamount;
        
            // private String restro_name;


          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };


  async function getdata(){


    const server_data = {
      uuid: 1,
      p_ID: data.map((item) => item.productID),
      qty: data.map((item) => item.qty),
      totalamount: totalprice,
      restro_name: data.restroID,

    }

    console.log(server_data);

     try{

      const res = await successordersummary(
        Cookies.get('token'),
        server_data ,
        true,
      )

  
      console.log(res);

      if ( res.data === "Success") {
        console.log("DELETE")
        try{
        
          await delreq(
            Cookies.get('token'),
            data.map((item)=>item.cartID)
          )
          
          handleClick();
        }catch(error){
          console.log(error);
        }

      }

    }catch(error){
      console.log(error)
    }
  }

  

    

  const handleQuantityChange = (index, event) => {
    const updatedData = [...data];
    updatedData[index].qty = parseInt(event.target.value);
    setdata(updatedData);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  

  return (
    
    <div className="w-screen">
      <NavBar />

      <div className="flex flex-col md:flex-row w-screen">
        <div className="px-5 w-full md:w-[900px] h-full ">
          <div className="w-full h-[50px] mb-2  my-2 mt-10 flex items-center justify-start mx-auto">
            <p className="text-center text-xl font-bold">
              You've Got Great Taste
            </p>
          </div>

          <div className="flex flex-col">
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const {
                  cartID,
                  productID,
                  restroID,
                  productName,
                  produtPrice,
                  qty,
                } = item;

                console.log(cartID);

                return (
                  <div
                    key={cartID}
                    className="h-[250px] flex flex-row border border-black border-1 shadow-md mb-2"
                  >
                    {/* cart products */}
                    <div className="w-[300px] flex items-center justify-center">
                      <img
                        className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full object-cover border shadow-lg"
                        src="https://blog.intercomassets.com/blog/wp-content/uploads/2020/06/MobileCarousel-ProductTour2.jpg.optimal.jpg"
                        alt=""
                      />
                    </div>
                    <div className="w-full flex flex-col px-5 py-2 md:py-5 bg-gray-200 gap-0">
                      <p className="text-xl font-semibold">{productName}</p>
                      <p className="text-sm font-medium">{restroID}</p>
                      <div className="flex flex-row">
                        <label
                          htmlFor="quantity"
                          className="w-[30px] mr-5 text-sm font-medium"
                        >
                          Qty
                        </label>
                        <input
                          id="quantity"
                          type="number"
                          value={qty}
                          min={1}
                          max={10}
                          className="w-[50px] text-sm font-medium"
                          onChange={(event) =>
                            handleQuantityChange(index, event)
                          }
                        />
                      </div>
                      <p className="text-sm font-medium mt-3">
                        Price{" "}
                        <span className="text-sm font-medium mt-3 ml-4">
                          {qty * produtPrice} USD
                        </span>
                      </p>
                      <div className="flex flex-col md:flex-row">
                        <button
                          className="mr-2 w-[100px] text-sm p-0.5 rounded-md shadow-md bg-black text-white hover:bg-gray-800"
                          onClick={() => {
                            delItem(Cookies.get("token"), item);
                            handleClick();
                          }}
                        >
                          Remove
                        </button>
                        <button
                          className="w-[100px] text-sm p-0.5 rounded-md shadow-md bg-black text-white hover:bg-gray-800"
                          onClick={() => {
                            updateBasket(Cookies.get("token"), item);
                            handleClick();
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[250px] flex flex-row border border-black border-1 shadow-md">
                ADD TO THE BASKET...
              </div>
            )}

            {/* Cart total */}
          </div>
        </div>

        <form className="w-screen" onSubmit={handlePayment}>
          <div className="w-screen p-5 md:w-[70%] md:p-2 mt-10 border border-black mx-0 md:mx-4">
            <div className="flex flex-row border-b">
              <p className="w-1/2">My Basket</p>
              <p className="w-1/2 text-end">{totalitem} item</p>
            </div>

            <div className="flex flex-row mt-2">
              <p className="w-1/2">Subtotal</p>
              <p className="w-1/2 text-end">${totalprice} USD</p>
            </div>

            <div className="flex flex-col mt-2">
              <p className="text-start">Pay By Card</p>

              {/* <input
                type="email"
                placeholder="EMAIL"
                name="email"
                className="rounded-md p-2 m-2 border border-black"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={16}
                minLength={16}
                name="cardNumber"
                placeholder="CARD NUMBER"
                className="rounded-md p-2 m-2 border border-black"
              />
              <input
                type="text"
                name="nameOnCard"
                placeholder="NAME ON CARD"
                className="rounded-md p-2 m-2 border border-black"
              />

              <div className="flex flex-row">
                <input
                  type="text"
                  name="expiry"
                  inputMode="numeric"
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                  placeholder="EXPIRY"
                  className="rounded-md p-2 m-2 border border-black w-1/2 mr-2"
                />
                <input
                  inputMode="numeric"
                  pattern="[0-9]{3}"
                  name="cvv"
                  maxLength={3}
                  placeholder="CVV"
                  className="rounded-md p-2 m-2 border border-black w-1/2"
                />
              </div> */}
              
              
              <CardElement />

              <button
          
                type="submit"
                onClick={console.log("click")}
                className="text-centre p-1 mx-4 my-2 bg-blue-600 text-white text-sm font-semibold h-[40px]"
              >
                Payment Secured
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      
  );
};


const stripePromise = loadStripe(stripePublicKey);

const WrappedCart = () => (
  <Elements stripe={stripePromise}>
    <Cart />
  </Elements>
);

export default WrappedCart;
