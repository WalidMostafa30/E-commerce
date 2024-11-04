import { useDispatch, useSelector } from "react-redux";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { useEffect } from "react";
import { cleanNewProducts, getNewProducts } from "../../store/newProductsSlice";
import ProductsItems from "../../components/ProductsItems/ProductsItems";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const NewProducts = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.newProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewProducts());

    return () => dispatch(cleanNewProducts());
  }, [dispatch]);

  return (
    <article className="container py-4">
      <GlobalTitle title={"New Products"} />

      <Loading
        isLoading={isLoading}
        error={error}
        data={products}
        msg={"New Products is empty"}
      >
        <ProductsItems products={products.slice(0, 4)} />

        <div className="w-100 d-flex">
          <Link
            to={"/categories"}
            className="mainBtn mx-auto mt-4 py-2 px-3 fs-3"
          >
            Show More
          </Link>
        </div>
      </Loading>
    </article>
  );
};

export default NewProducts;
