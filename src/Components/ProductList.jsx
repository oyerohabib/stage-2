/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Pagination from "./Pagination";
import Button from "./Button";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatCurrency";
import Spinner from "./Spinner";
import renderStarReviews from "../utils/renderReviews";
import placeholderImage from "/assets/ProductItems/placeholder.jpg";

export default function ProductList({ searchTerm }) {
  // Logic handling product response from Timbu API

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigateTo = useNavigate();

  const {
    isInCart,
    wishList,
    addToWishList,
    removeFromWishList,
    handleCartAction,
  } = useCart();

  const fetchProducts = (page) => {
    setLoading(true);
    fetch(
      `https://timbu-get-all-products.reavdev.workers.dev?organization_id=f79b9b80692d4c528019e02d843e7329&reverse_sort=false&page=${page}&size=10&Appid=QORLYEM2HICIBI8&Apikey=bd7863eb220049cd9850e05163a7cc0220240713223453586306`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.items) {
          const formattedProducts = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            image:
              item.photos && item.photos.length > 0
                ? `https://api.timbu.cloud/images/${item.photos[0].url}`
                : "../../assets/ProductItems/pencils.jpg",
            price:
              item.current_price && item.current_price[0].NGN[0]
                ? parseFloat(item.current_price[0].NGN[0])
                : 0,
            stars: item.extra_infos || Math.round(Math.random() * 5),
          }));
          setProducts(formattedProducts);
          setTotalPages(Math.ceil(data.total / data.size));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Fetch failed:", error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const navigateToProductDetail = (productId) => {
    navigateTo(`/products/${productId}`);
  };

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const isItemInWishList = (product) =>
    wishList.some((item) => item.id === product.id);

  const handleAddToWishList = (product) => {
    if (isItemInWishList(product)) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section>
      <h2 className="text-6xl mb-8">Products</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          <Spinner />
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex bg-white shadow-md rounded-lg p-4 relative flex-col"
            >
              <div
                className="absolute top-8 right-8 text-yellow-500"
                onClick={() => handleAddToWishList(product)}
              >
                {isItemInWishList(product) ? (
                  <FaHeart className="text-2xl cursor-pointer" />
                ) : (
                  <FaRegHeart className="text-2xl cursor-pointer" />
                )}
              </div>
              <img
                src={product.image}
                alt="Product Image"
                className="w-full object-cover rounded-t-lg"
                onClick={() => navigateToProductDetail(product.id)}
                style={{ cursor: "pointer" }}
                loading="lazy"
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <img
                  src={placeholderImage}
                  alt="Placeholder Image"
                  className="w-full object-cover rounded-t-lg"
                  // style={{ minHeight: "200px" }} // Adjust height as needed
                />
              )}
              <div className="mt-4 flex flex-col gap-4 flex-grow">
                <h3
                  className="text-xl"
                  onClick={() => navigateToProductDetail(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center flex-row">
                  Ratings:&nbsp;{" "}
                  <span className="text-yellow-600 flex">
                    {renderStarReviews(parseInt(product.stars))}
                  </span>
                </div>
                <p className="text-yellow-600 font-bold">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-auto">
                  <Button
                    text={
                      isInCart(product.id) ? "Remove from Cart" : "Add to Cart"
                    }
                    onClick={() => handleCartAction(product)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
