import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addOrder } from "../../store/orderSlice";
import { deleteCart } from "../../store/cartSlice";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const PaymentForm = ({ toggleForm }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({});

  const onChangeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.order);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validation = {};

    if (!form.email.trim()) {
      validation.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validation.email = "email is not valid";
    }

    if (!form.password.trim()) {
      validation.password = "password is required";
    } else if (form.password.length < 4) {
      validation.password = "password should be at least 4 char";
    }

    if (!form.name.trim()) {
      validation.name = "name is required";
    }

    if (!form.cardNumber.trim()) {
      validation.cardNumber = "card number is required";
    } else if (form.cardNumber.length < 4) {
      validation.cardNumber = "card number should be at least 4 char";
    }

    setErrMsg(validation);

    if (Object.keys(validation).length === 0) {
      dispatch(addOrder({ name: form.name, email: form.email }))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "You Order is done",
            icon: "success",
          });
        })
        .then(() => {
          dispatch(deleteCart());
        })
        .then(() => {
          navigate("/order");
        });
    }
  };

  return (
    <div
      className="h-100 w-100 position-fixed top-0 start-0 z-3 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000000c7" }}
    >
      <form
        className="col-12 col-md-6 d-flex flex-column g-2 bg-white rounded-3 p-3"
        onSubmit={onSubmitHandler}
      >
        <div className="mb-2">
          <label className="fs-5" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Name.."
            value={form.name}
            onChange={onChangeHandler}
            className={`${
              errMsg.name ? "border-danger" : ""
            } w-100 fs-5 p-2 rounded-2`}
            style={{ outline: "none", border: "2px solid var(--main-color)" }}
          />
          {errMsg.name && (
            <span className="text-danger fw-medium">{errMsg.name}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="fs-5" htmlFor="email">
            E-mail
          </label>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="E-mail.."
            value={form.email}
            onChange={onChangeHandler}
            className={`${
              errMsg.email ? "border-danger" : ""
            } w-100 fs-5 p-2 rounded-2`}
            style={{ outline: "none", border: "2px solid var(--main-color)" }}
          />
          {errMsg.email && (
            <span className="text-danger fw-medium">{errMsg.email}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="fs-5" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            name="cardNumber"
            id="cardNumber"
            type="number"
            placeholder="Card Number.."
            value={form.cardNumber}
            onChange={onChangeHandler}
            className={`${
              errMsg.cardNumber ? "border-danger" : ""
            } w-100 fs-5 p-2 rounded-2`}
            style={{ outline: "none", border: "2px solid var(--main-color)" }}
          />
          {errMsg.cardNumber && (
            <span className="text-danger fw-medium">{errMsg.cardNumber}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="fs-5" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password.."
            value={form.password}
            onChange={onChangeHandler}
            className={`${
              errMsg.password ? "border-danger" : ""
            } w-100 fs-5 p-2 rounded-2`}
            style={{ outline: "none", border: "2px solid var(--main-color)" }}
          />
          {errMsg.password && (
            <span className="text-danger fw-medium">{errMsg.password}</span>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button disabled={loading} className="btn btn-primary fs-5">
            {loading ? "loading..." : "Place order"}
          </button>

          <span onClick={toggleForm} className="btn btn-danger fs-5">
            cancel
          </span>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
