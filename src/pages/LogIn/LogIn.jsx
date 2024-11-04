import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAuthLogin } from "../../store/authSlice";
import Swal from "sweetalert2";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({});

  const onChangeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const onSupmitHandler = (e) => {
    e.preventDefault();

    const validation = {};

    if (!form.email.trim()) {
      validation.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validation.email = "email is not valid";
    }

    if (!form.password.trim()) {
      validation.password = "password is required";
    } else if (form.password.length < 6) {
      validation.password = "password should be at least 6 char";
    }

    setErrMsg(validation);

    if (Object.keys(validation).length === 0) {
      dispatch(actAuthLogin(form))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "You are Logged in Successfully",
            text: "You can now use Cart and Favourites, more features",
            icon: "success",
          });
        })
        .then(() => {
          navigate("/");
        });
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <GlobalTitle title={"Log In"} />
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="col-12 col-md-6 d-flex flex-column g-2"
          onSubmit={onSupmitHandler}
        >
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

          <button
            disabled={loading}
            className="mainBtn mx-auto my-2 py-1 px-5 fs-2"
          >
            {loading ? "loading..." : "Log in"}
          </button>

          <Link className="m-auto fs-5 text-primary" to={"/signup"}>
            create acount?
          </Link>
          {error && (
            <p className="alert alert-danger fw-medium text-center">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default LogIn;
