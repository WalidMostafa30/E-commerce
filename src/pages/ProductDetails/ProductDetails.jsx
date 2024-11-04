import { useDispatch, useSelector } from "react-redux";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartAction } from "../../store/cartSlice";
import { actLikeToggle } from "../../store/favouriteSlice.js";
import {
  cleanProductDetails,
  getProductDetails,
} from "../../store/productDetailsSlice";
import Loading from "../../components/Loading/Loading";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

  const [activeImg, setActiveImg] = useState(0);

  const imgNum = (index) => setActiveImg(index);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleAddToCart = (pro) => {
    if (user) {
      dispatch(CartAction({ id: pro.id, act: "add" }));
    } else {
      Swal.fire({
        title: "You are not Logged in",
        text: "Log in first to use it",
        icon: "warning",
      });
      navigate("/login");
    }
  };

  const handleAddToFavourite = (pro) => {
    if (user) {
      dispatch(actLikeToggle(pro.id));
    } else {
      Swal.fire({
        title: "You are not Logged in",
        text: "Log in first to use it",
        icon: "warning",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(id));

    return () => dispatch(cleanProductDetails());
  }, [dispatch, id]);

  return (
    <section className="ProductDetails">
      <Loading
        isLoading={isLoading}
        error={error}
        data={Object.values(productDetails)}
        msg={"Product Details is empty"}
      >
        <div className="ProductDetails__container container row m-auto g-4">
          <div className="col-12 col-xl-5 d-flex flex-column gap-2">
            <div className="ProductDetails__bigImg">
              <img
                src={productDetails.images && productDetails.images[activeImg]}
                alt={productDetails.title}
                loading="lazy"
              />
            </div>

            <div className="row row-cols-3 g-2">
              {productDetails.images &&
                productDetails.images.map((img, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={
                          activeImg === index
                            ? "ProductDetails__smallImg active"
                            : "ProductDetails__smallImg"
                        }
                        onClick={() => imgNum(index)}
                      >
                        <img
                          src={img}
                          alt={productDetails.title}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="col-12 col-xl-7">
            <h1 className="fw-semibold">{productDetails.title}</h1>

            <h5 className="my-3">{productDetails.description}</h5>

            <p className="mb-3 fs-3 fw-semibold textMC">
              {productDetails.price} $
            </p>

            <div className="w-100 d-flex align-items-center gap-2">
              <button
                className="mainBtn py-2 px-4 fs-3"
                onClick={() => handleAddToFavourite(productDetails)}
              >
                <IoMdHeart />
              </button>

              <button
                className="mainBtn p-2 fs-3 w-100"
                onClick={() => handleAddToCart(productDetails)}
              >
                Add To Cart <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </Loading>
    </section>
  );
};

export default ProductDetails;
