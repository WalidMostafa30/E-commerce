/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import {
  IoBagCheckSharp,
  IoCart,
  IoClose,
  IoMenu,
  IoSearch,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogout } from "../../../store/authSlice";
import "./HeaderIcons.css";
import { RiLogoutBoxRLine } from "react-icons/ri";

const HeaderIcons = ({ nav, closeNav, openNav }) => {
  const { cartIds } = useSelector((state) => state.cart);

  const { favouriteIds } = useSelector((state) => state.favourite);

  const { user } = useSelector((state) => state.auth);

  const cartLength =
    user && cartIds.filter((item) => item.userId === user.id).length;

  const favLength =
    user && favouriteIds.filter((item) => item.userId === user.id).length;

  const dispatch = useDispatch();
  const [userMenu, setUserMenu] = useState(false);

  const toggleUserMenu = () => setUserMenu((prev) => !prev);

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(authLogout());
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <Link to={"search"} className="fs-3">
        <IoSearch />
      </Link>

      {user ? (
        <div className="d-flex align-items-center gap-3">
          <Link to={"/favourite"} className="fs-3 position-relative">
            <IoMdHeart />
            {favLength > 0 && (
              <span className="iconNum">
                {favLength > 9 ? "+9" : favLength}
              </span>
            )}
          </Link>

          <Link to={"cart"} className="fs-3 position-relative">
            <IoCart />
            {cartLength > 0 && (
              <span className="iconNum">
                {cartLength > 9 ? "+9" : cartLength}
              </span>
            )}
          </Link>

          <div
            className="position-relative"
            onClick={toggleUserMenu}
            style={{ cursor: "pointer" }}
          >
            <FaUserCircle className="fs-3" />
            {userMenu && (
              <div className="user__menu">
                <span className="fs-5">Hi</span>
                <h4>{user.name}</h4>

                <div className="d-flex flex-column gap-1 pt-2">
                  <Link
                    className="fs-4 btn btn-secondary d-flex align-items-center justify-content-center gap-2"
                    to={"/profile"}
                  >
                    Profile
                    <FaUser />
                  </Link>

                  <Link
                    className="fs-4 btn btn-secondary d-flex align-items-center justify-content-center gap-2"
                    to={"/order"}
                  >
                    Order
                    <IoBagCheckSharp />
                  </Link>

                  <button
                    className="fs-4 btn btn-danger d-flex align-items-center justify-content-center gap-2"
                    onClick={handleLogOut}
                  >
                    Log Out
                    <RiLogoutBoxRLine />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Link className="mainBtn px-3 py-2" to="/login">
            Log In
          </Link>
        </div>
      )}

      <div className="BarsMenu fs-2" style={{ cursor: "pointer" }}>
        {nav ? <IoClose onClick={closeNav} /> : <IoMenu onClick={openNav} />}
      </div>
    </div>
  );
};

export default HeaderIcons;
