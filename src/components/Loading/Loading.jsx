/* eslint-disable react/prop-types */
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import errorImg from "../../assets/images/errorImg.svg";
import emptyImg from "../../assets/images/emptyImg.svg";

const Loading = ({ isLoading, error, data, msg, children }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message msgImg={errorImg} msg={"Not Found"} />;
  }

  if (!data.length) {
    return <Message msgImg={emptyImg} msg={msg} />;
  }

  return <>{children}</>;
};

export default Loading;
