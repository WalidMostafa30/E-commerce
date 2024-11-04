import { useDispatch, useSelector } from "react-redux";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { deleteOrder } from "../../store/orderSlice";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Order = () => {
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  
  const dispatch = useDispatch();
  
  const userOrder = orders.filter((order) => order.userId === user.id);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="container">
      <GlobalTitle title={"Order"} />

      <Loading
        isLoading={isLoading}
        error={error}
        data={userOrder}
        msg={"Orders is empty"}
      >
        <div className="row row-cols-lg-2 row-cols-xxl-3 g-2">
          {userOrder.map((order, index) => (
            <div key={order.id}>
              <div className="rounded-3 p-2 shadow bgMC">
                <h1 className="text-center text-white p-1">
                  Order {index + 1}
                </h1>

                <div className="bg-white rounded-2 overflow-hidden">
                  <table className="table table-striped table-bordered fs-5 mb-1">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{order.name}</td>
                      </tr>

                      <tr>
                        <td>E-mail</td>
                        <td>{order.email}</td>
                      </tr>

                      <tr>
                        <td>Date</td>
                        <td>{order.date}</td>
                      </tr>

                      <tr>
                        <td>Time</td>
                        <td>{order.time}</td>
                      </tr>

                      <tr>
                        <td>Total Products</td>
                        <td>{order.totalProduct}</td>
                      </tr>

                      <tr>
                        <td>Total Pieces</td>
                        <td>{order.totalPieces}</td>
                      </tr>

                      <tr>
                        <td>Total Price</td>
                        <td>{order.totalPrice} $</td>
                      </tr>
                    </tbody>
                  </table>

                  <h4
                    className="p-1 fw-bold text-center"
                    style={{ backgroundColor: "#eee" }}
                  >
                    Products
                  </h4>
                  <div>
                    {order.products.map((product) => (
                      <div
                        key={product.id}
                        className="d-flex text-center p-1 gap-2 shadow-sm"
                      >
                        <div
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                          className="rounded-2 overflow-hidden"
                        >
                          <img
                            src={product.image}
                            className="w-100 h-100"
                            loading="lazy"
                          />
                        </div>

                        <div className="col-9 row">
                          <h5
                            style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {product.title}
                          </h5>
                          <h5 className="textMC col-6">{product.price} $</h5>
                          <h5 className="col-6">x{product.quantity}</h5>
                          <h5 className="col-12">
                            {product.quantity * product.price} $
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-1">
                    <button
                      className="btn btn-danger fs-5 w-100"
                      onClick={() => dispatch(deleteOrder(order.id))}
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Loading>
    </section>
  );
};

export default Order;
