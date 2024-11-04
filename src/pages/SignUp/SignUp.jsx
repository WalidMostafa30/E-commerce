import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAuthRegister } from "../../store/authSlice";
import Swal from "sweetalert2";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.auth);

  const onChangeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSupmitHandler = (e) => {
    e.preventDefault();

    const validation = {};

    if (!form.name.trim()) {
      validation.name = "name is required";
    }

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

    if (!form.confirmPassword.trim()) {
      validation.confirmPassword = "confirm password is required";
    } else if (form.confirmPassword !== form.password) {
      validation.confirmPassword = "password not matched";
    }

    setErrMsg(validation);

    if (Object.keys(validation).length === 0) {
      dispatch(
        actAuthRegister({
          name: form.name,
          password: form.password,
          email: form.email,
          id: new Date().getTime(),
        })
      )
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "You Signed up Successfully",
            text: "You can now Log in",
            icon: "success",
          });
        })
        .then(() => {
          navigate("/login");
        });
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <GlobalTitle title={"Sign Up"} />

      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="col-12 col-md-6 d-flex flex-column g-2"
          onSubmit={onSupmitHandler}
        >
          <div className="mb-2">
            <label className="fs-5" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Name.."
              id="name"
              name="name"
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
              type="email"
              id="email"
              placeholder="E-mail.."
              name="email"
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
            {error && <span className="text-danger fw-medium">{error}</span>}
          </div>

          <div className="mb-2">
            <label className="fs-5" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password.."
              name="password"
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

          <div className="mb-2">
            <label className="fs-5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirmPassword.."
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChangeHandler}
              className={`${
                errMsg.confirmPassword ? "border-danger" : ""
              } w-100 fs-5 p-2 rounded-2`}
              style={{ outline: "none", border: "2px solid var(--main-color)" }}
            />
            {errMsg.confirmPassword && (
              <span className="text-danger fw-medium">
                {errMsg.confirmPassword}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            className="mainBtn mx-auto my-2 py-1 px-5 fs-2"
          >
            {loading ? "loading..." : "Submit"}
          </button>

          <Link className="m-auto fs-5 text-primary" to={"/login"}>
            already have an acount?
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
