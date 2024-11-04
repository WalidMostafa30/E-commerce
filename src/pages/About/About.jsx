import { AiFillInstagram } from "react-icons/ai";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

const About = () => {
  return (
    <section>
      <GlobalTitle title={"About"} />

      <div className="container row m-auto align-items-center justify-content-center">
        <div className="col-12 col-xl-5 d-flex flex-column align-items-center">
          <h1 className="fw-bold" style={{ fontSize: "60px" }}>
            Mini<span className="textMC">Store</span>
          </h1>

          <div className="d-flex align-items-center justify-content-center gap-4 mt-1">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100011538554307&mibextid=ViGcVu"
            >
              <SiFacebook className="fs-2" />
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/walid-mostafa-bb3567295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            >
              <FaLinkedin className="fs-2" />
            </a>

            <a target="_blank" href="https://github.com/WalidMostafa30">
              <FaGithub className="fs-2" />
            </a>

            <a
              target="_blank"
              href="https://instagram.com/walid_mostafa10?igshid=M2RkZGJiMzhjOQ=="
            >
              <AiFillInstagram className="fs-2" />
            </a>
          </div>
        </div>

        <p className="fs-4 col-12 col-xl-7 mt-4 mt-xl-0">
          MiniStore is your one-stop destination for all things convenient and
          stylish. Our platform offers a seamless e-commerce experience,
          bringing a wide array of products right to your fingertips. From
          trendy fashion items to essential home goods, MiniStore carefully
          curates high-quality products to meet diverse needs. With an intuitive
          interface and a secure checkout process, shopping has never been
          easier or more enjoyable. We pride ourselves on fast delivery,
          excellent customer service, and unbeatable deals, making MiniStore the
          perfect choice for anyone looking to shop smart.
        </p>
      </div>
    </section>
  );
};

export default About;
