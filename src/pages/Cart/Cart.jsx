import { useDispatch, useSelector } from "react-redux";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import CartProducts from "../../components/CartProducts/CartProducts";
import CartDetails from "../../components/CartDetails/CartDetails";
import { useEffect } from "react";
import { actGetCart, cleanCart } from "../../store/cartSlice";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function Cart() {
  const { cart, isLoading, error } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetCart());

    return () => dispatch(cleanCart());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="Cart">
      <GlobalTitle title={"Cart"} />

      <Loading
        isLoading={isLoading}
        error={error}
        data={cart}
        msg={"Cart is empty"}
      >
        <div className="Cart__container container row m-auto g-3">
          <div className="Cart__details col-12 col-xl-5">
            <CartDetails products={cart} />
          </div>

          <div className="Cart__products col-12 col-xl-7">
            <CartProducts products={cart} />
          </div>
        </div>
      </Loading>
    </section>
  );
}
