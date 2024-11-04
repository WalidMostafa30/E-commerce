import { SiFacebook } from "react-icons/si";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="d-flex flex-column align-items-center justify-content-evenly py-5 flex-xl-row gap-4">
        <div>
          <h1 className="Footer__Title">
            Mini<span>Store</span>
          </h1>

          <div className="Footer__links d-flex align-items-center justify-content-center gap-4 mt-1">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100011538554307&mibextid=ViGcVu"
            >
              <SiFacebook />
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/walid-mostafa-bb3567295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            >
              <FaLinkedin />
            </a>

            <a target="_blank" href="https://github.com/WalidMostafa30">
              <FaGithub />
            </a>

            <a
              target="_blank"
              href="https://instagram.com/walid_mostafa10?igshid=M2RkZGJiMzhjOQ=="
            >
              <AiFillInstagram />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-center fw-bold">Pages</h2>

          <ul className="Footer__pages mt-3 d-flex justify-content-center gap-4">
            <Link to={"/"}>Home</Link>
            <Link to={"categories"}>Categories</Link>
            <Link to={"cart"}>Cart</Link>
            <Link to={"favourite"}>Favourite</Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}
