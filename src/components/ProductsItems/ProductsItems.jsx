/* eslint-disable react/prop-types */
import Product from "../product/Product";

const ProductsItems = ({ products }) => {
  return (
    <div className="ProductsItems row justify-content-start row-cols-lg-3 row-cols-xl-4 row-cols-md-2 g-4">
      {products.map((pro) => {
        return (
          <div key={pro.id}>
            <Product pro={pro} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsItems;
