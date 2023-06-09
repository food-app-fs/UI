import React, { useState } from "react";
import { putBasket } from "../service/Cartredis";
import Cookies from "js-cookie";

const Menutable = ({ menu }) => {
  const [cartdata, setcart] = useState({
    cartID: "",
    productID: "",
    restroID: "",
    productName: "",
    produtPrice: "",
    qty: "",
    restroName: "",
  });



  console.log(menu);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-1 p-4 flex items-center justify-start overflow-y-auto scrollbar-hide">
      {menu.map((menu) => {
        const { productId, name, description, price, image,restaurantId } = menu;
        return (
          <div className="h-[150px] mb-2 w-[400px] flex flex-row  hover:shadow-xl border border-gray-500 border-solid ">
            <div className="mr-1">
              <img
                className="rounded-xl w-[130px] h-[130px]"
                src="https://b.zmtcdn.com/data/dish_photos/79a/56eca9d96f1941603afeb726d8a4b79a.jpg?fit=around|130:130&crop=130:130;*,*"
                alt=""
              />
            </div>

            <div className="flex flex-col">
              <div className="">
                <p className="text-lg font-medium text-black">{name}</p>
              </div>

              <div className="">
                <p className="text-sm font-thin text-gray-500">{description}</p>
              </div>

              <div className="h-[30px]">
                <div className="flex flex-row">
                  <div className="w-1/3 items-center">
                    <p className=" text-sm font-thin text-gray-800">
                      <span className="text-sm font-thin text-gray-800">
                        $ {price}
                      </span>
                    </p>
                  </div>

                  <div className="w-1/2  items-center">
                    <button
                      className="rounded-lg bg-orange-400 text-white p-1"
                      onClick={() => {
                        setcart((cart) => ({
                          ...cart,
                          cartID: (Math.floor(10000 + Math.random() * 90000))%1000,
                          productID: productId,
                          productName: name,
                          qty:1,
                          produtPrice: price,
                          restroID:restaurantId,
                        }));
                        console.log("data on click" +  cartdata)
                        putBasket(Cookies.get("token"), cartdata);
                      }}
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menutable;
