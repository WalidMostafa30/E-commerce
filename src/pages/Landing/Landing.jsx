import bigBG from "../../assets/images/bigBG.webp";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <article className="Landing position-relative">
      <div className="container h-100 d-flex justify-content-center justify-content-lg-end align-items-center">
        <div className="d-flex justify-content-center flex-column align-items-center gap-2">
          <p className="text-white fs-2">welcome to</p>

          <h1 className="Landing__title">
            Mini<span className="text-white">Store</span>
          </h1>

          <Link to={"categories"} className="mainBtnLight px-3 py-2 fs-3">
            Shop Now
          </Link>
        </div>
      </div>

      <img
        src={bigBG}
        alt="backGround-img"
        loading="lazy"
        className="top-0 start-0 position-absolute z-n1 h-100 w-100 object-fit-cover"
      />
    </article>
  );
};

export default Landing;
