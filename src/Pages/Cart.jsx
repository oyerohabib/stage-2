import Header from "../Components/Header";
import Subscription from "../Components/Subscription";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiMastercardFill, RiPaypalFill, RiVisaFill } from "react-icons/ri";

export default function Cart() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-4">
        <nav className="mb-4">
          <Link to="/" className="hover:underline">
            <span className="text-gray-500 mr-2">Home</span>
          </Link>{" "}
          <FaAngleRight className="inline text-gray-500" />{" "}
          <span className="ml-2">Cart</span>
        </nav>
        <h1 className="text-5xl mb-6">Cart</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[70%] bg-white p-6 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-6">
              <thead className="bg-[#F9F1D1]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">
                    Item details
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wider">
                    Item price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-wrap flex items-center max-w-[24rem]">
                    <img
                      src="../../assets/ProductImage.jpg"
                      alt="Venus Eye Pencil Collection"
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <div>Venus Eye Pencil Collection</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="number"
                      value="3"
                      className="w-12 text-center border p-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-bold">₦ 15,000</div>
                    <div className="text-sm">
                      <span className="text-gray-500">Unit price </span>
                      <span className="font-bold">₦5,000</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div>
                      <a href="#" className="text-gray-500 hover:underline">
                        Remove item
                      </a>
                    </div>
                    <div>
                      <a href="#" className="text-yellow-500 hover:underline">
                        Saved for later
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <Link to="/" className="hidden lg:block">
              <button className="px-4 py-2 border-[1.5px] border-yellow-500 hover:bg-yellow-500 hover:text-white transition duration-200 mb-4 flex items-center gap-1 rounded-md">
                <FaAngleLeft className="inline" />
                Continue Shopping
              </button>
            </Link>
          </div>
          <div className="lg:w-[30%] bg-white p-6">
            <h2 className="text-lg font-bold mb-4 rounded-t-md bg-yellow-500 text-white p-2">
              Order Summary
            </h2>
            <div className="p-4">
              <div className="flex justify-end text-xl font-semibold">
                <div>2 Items</div>
              </div>
              <div className="bg-yellow-500 divide-y h-[1px] my-4"></div>
              <div className="flex flex-col justify-between mb-2">
                <div className="text-xl mb-2">Delivery Charges:</div>
                <div className="text-gray-500 self-end">
                  Add your Delivery address at checkout to see delivery charges
                </div>
              </div>
              <div className="bg-yellow-500 divide-y h-[1px] my-4"></div>
              <div className="flex flex-col gap-4 justify-between mb-2">
                <div>Coupons and Discounts</div>
                <div className="flex ml-auto flex-wrap">
                  <input type="text" className="border p-1 h-10" />
                  <button className="bg-yellow-500 text-white px-6 h-10">
                    Apply
                  </button>
                </div>
              </div>
              <div className="bg-yellow-500 divide-y h-[1px] my-4"></div>
              <div className="flex justify-between font-bold mb-2">
                <div>Subtotal</div>
                <div>₦ 25,000</div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <div>Savings</div>
                <div>₦ 2,000</div>
              </div>
              <div className="bg-yellow-500 divide-y h-[1px] my-4"></div>
              <div className="flex justify-between font-bold text-xl">
                <div>Total (2 items)</div>
                <div>₦ 23,000</div>
              </div>
              <p className="text-red-700 text-right text-sm py-4">
                Excluding delievery charges
              </p>
              <Link to="/" className="block lg:hidden">
                <button className="px-4 py-2 border-[1.5px] border-yellow-500 hover:bg-yellow-500 hover:text-white transition duration-200 my-6 flex items-center gap-1 rounded-md">
                  <FaAngleLeft className="inline" />
                  Continue Shopping
                </button>
              </Link>
              <Link to="/checkout">
                <Button text={"Checkout"} />
              </Link>
              <div className="text-center text-gray-500 text-sm mt-6">
                <div className="flex justify-center items-center gap-2">
                  We accept:
                  <RiPaypalFill className="w-8 h-8 inline-flex" />
                  <RiVisaFill className="w-8 h-8 inline-flex" />
                  <RiMastercardFill className="w-8 h-8 inline-flex" />
                </div>
                <div className="mt-4">
                  Transactions are 100% Safe and Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Subscription />
      <Footer />
    </>
  );
}
