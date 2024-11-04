import { useParams } from "react-router-dom";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanProducts, getProducts } from "../../store/productsSlice";
import Loading from "../../components/Loading/Loading";
import ProductsItems from "../../components/ProductsItems/ProductsItems";

const Products = () => {
  const { prefix } = useParams();
  const { products, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(prefix));

    return () => dispatch(cleanProducts());
  }, [dispatch, prefix]);

  return (
    <section className="Products">
      <GlobalTitle title={"Products"} />

      <Loading
        isLoading={isLoading}
        error={error}
        data={products}
        msg={"Product is empty"}
      >
        <div className="container">
          <ProductsItems products={products} />
        </div>
      </Loading>
    </section>
  );
};

export default Products;
