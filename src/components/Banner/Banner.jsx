import bannerImg from "../../assets/images/banner.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <article
      className="position-relative d-flex flex-column align-items-center justify-content-center gap-3 my-3"
      style={{ height: "300px" }}
    >
      <img
        src={bannerImg}
        alt="Banner"
        className="w-100 h-100 object-fit-cover position-absolute z-n1"
        loading="lazy"
      />

      <p className="text-light fs-5">repair Services</p>

      <h1 className="text-light">
        Up to <span className="textMC">70% off</span> _ All t-shirts
      </h1>

      <Link className="mainBtnLight py-2 px-3 fs-3" to={"categories"}>
        Explore more
      </Link>
    </article>
  );
};

export default Banner;
