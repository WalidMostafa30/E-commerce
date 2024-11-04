/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { CartAction } from "../../store/cartSlice";
import "./CartProducts.css";

const CartProducts = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="rounded-3"
      style={{ border: "3px solid var(--main-color)" }}
    >
      {products.map((pro) => {
        return (
          <div key={pro.id} className="CartProduct p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h4 className="CartProduct__title fs-4 fw-semibold">
                {pro.title}
              </h4>

              <h3 className="textMC fw-semibold">{pro.price} $</h3>
            </div>

            <div className="d-flex">
              <div
                className="rounded-2 overflow-hidden"
                style={{
                  width: "150px",
                  height: "150px",
                  filter: "drop-shadow(-2px 4px 3px #00000040)",
                }}
              >
                <img
                  className="h-100 w-100 object-fit-cover"
                  src={pro.images[0]}
                  alt={pro.title}
                  loading="lazy"
                />
              </div>

              <div className="d-flex flex-column align-items-center justify-content-center gap-2 flex-grow-1">
                <h3>{pro.price * pro.quantity} $</h3>

                <div className="CartProduct__quantity d-flex align-items-center justify-content-center w-auto rounded-2">
                  <button
                    className="fs-4 px-3 fw-semibold border-0 text-white bgMC"
                    onClick={() =>
                      dispatch(CartAction({ id: pro.id, act: "decrease" }))
                    }
                  >
                    -
                  </button>

                  <p className="fs-6 px-3 border-0">{pro.quantity}</p>

                  <button
                    className="fs-4 px-3 fw-semibold border-0 text-white bgMC"
                    onClick={() =>
                      dispatch(CartAction({ id: pro.id, act: "add" }))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch(CartAction({ id: pro.id, act: "remove" }))
                  }
                  className="btn btn-danger py-1 px-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartProducts;
