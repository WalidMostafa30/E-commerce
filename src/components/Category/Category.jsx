/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Category.css";

const Category = ({ cat }) => {
  return (
    <Link to={`/categories/products/${cat.prefix}`} className="Category">
      <div className="Category__img">
        <img src={cat.img} alt={cat.title} loading="lazy" />
      </div>

      <h3 className="mt-3 fw-semibold">{cat.title}</h3>
    </Link>
  );
};

export default Category;
