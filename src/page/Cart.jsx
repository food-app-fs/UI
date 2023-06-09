import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { validateToken } from "../service/AuthService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getBasketData } from "../service/ReadCardRedis";

const Cart = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dt = await getBasketData(Cookies.get("token"));
        setdata(dt);
        console.log("data" + dt);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        // Handle the error appropriately
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
              data.map((item) => {
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
                          className="w-[50px] text-sm font-medium"
                        />
                      </div>
                      <p className="text-sm font-medium mt-3">
                        Price{" "}
                        <span className="text-sm font-medium mt-3 ml-4">
                          {qty * produtPrice} USD
                        </span>
                      </p>
                      <button className="w-[100px] text-sm p-0.5 rounded-md shadow-md bg-black text-white hover:bg-gray-800">
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[250px] flex flex-row border border-black border-1 shadow-md">
                Loading...
              </div>
            )}

            {/* Cart total */}
          </div>
        </div>

        <div className="w-screen p-5 md:w-2/4 md:p-2 mt-10 border border-black mx-0 md:mx-4">
          <div className="flex flex-row border-b">
            <p className="w-1/2">My Basket</p>
            <p className="w-1/2 text-end">1 item</p>
          </div>

          <div className="flex flex-row mt-2">
            <p className="w-1/2">Subtotal</p>
            <p className="w-1/2 text-end">$20.00 USD</p>
          </div>

          <div className="flex flex-col mt-2">
            <p className="text-start">Pay By Card</p>

            <input
              type="email"
              placeholder="EMAIL"
              className="rounded-md p-2 m-2 border border-black"
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={16}
              minLength={16}
              placeholder="CARD NUMBER"
              className="rounded-md p-2 m-2 border border-black"
            />
            <input
              type="text"
              placeholder="NAME ON CARD"
              className="rounded-md p-2 m-2 border border-black"
            />

            <div className="flex flex-row">
              <input
                type="text"
                inputMode="numeric"
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                placeholder="EXPIRY"
                className="rounded-md p-2 m-2 border border-black w-1/2 mr-2"
              />
              <input
                inputMode="numeric"
                pattern="[0-9]{3}"
                maxLength={3}
                placeholder="CVV"
                className="rounded-md p-2 m-2 border border-black w-1/2"
              />
            </div>

            <button className="text-centre p-1 mx-4 my-2 bg-blue-600 text-white text-sm font-semibold h-[40px]">
              Payment Secured
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
