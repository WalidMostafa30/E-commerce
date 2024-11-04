/* eslint-disable react/prop-types */

import { useState } from "react";
import PaymentForm from "../PaymentForm/PaymentForm";

const CartDetails = ({ products }) => {
  const [openForm, setOpenForm] = useState(false);
  const toggleForm = () => setOpenForm((prev) => !prev);

  const totalPrice = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const totalPieces = products.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);

  return (
    <>
      <div
        className="p-3 rounded-3 d-flex flex-column align-items-center"
        style={{ border: "3px solid var(--main-color)" }}
      >
        <table className="table table-striped table-hover table-bordered fs-4">
          <tbody>
            <tr>
              <td>Total Products</td>
              <td>{products.length}</td>
            </tr>
            <tr>
              <td>Total Pieces</td>
              <td>{totalPieces}</td>
            </tr>
            <tr>
              <td>Total Price</td>
              <td>{totalPrice} $</td>
            </tr>
          </tbody>
        </table>

        <button className="mainBtn py-1 px-3 fs-3" onClick={toggleForm}>
          Check out
        </button>
      </div>

      {openForm && <PaymentForm toggleForm={toggleForm} />}
    </>
  );
};

export default CartDetails;
