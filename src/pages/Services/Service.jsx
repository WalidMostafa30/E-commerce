import "./Services.css";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { FaTruck, FaUnlockAlt } from "react-icons/fa";
import { MdHeadset } from "react-icons/md";

export default function Services() {
  return (
    <article className="Services py-4">
      <GlobalTitle title={"Services"} />

      <div className="container row justify-content-between m-auto row-cols-xl-3 row-cols-md-2 g-3">
        <div>
          <div className="Services__card d-flex flex-column align-items-center gap-3 p-3 rounded-3">
            <FaUnlockAlt className="Services__card-icon" />
            <h1 className="textMC fw-bold">Payment Secure</h1>
            <p>Free shipping on order</p>
          </div>
        </div>

        <div>
          <div className="Services__card d-flex flex-column align-items-center gap-3 p-3 rounded-3">
            <MdHeadset className="Services__card-icon" />
            <h1 className="textMC fw-bold">Support 24/7</h1>
            <p>Contact us 24 hrs a day</p>
          </div>
        </div>

        <div>
          <div className="Services__card d-flex flex-column align-items-center gap-3 p-3 rounded-3">
            <FaTruck className="Services__card-icon" />
            <h1 className="textMC fw-bold">Free Shipping</h1>
            <p>Free shipping on order</p>
          </div>
        </div>
      </div>
    </article>
  );
}
