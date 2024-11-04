/* eslint-disable react/prop-types */

const Message = ({ msg, msgImg }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {msgImg && (
        <div
          style={{
            width: "300px",
            height: "300px",
          }}
        >
          <img className="w-100 h-100" src={msgImg} alt={msg} loading="lazy" />
        </div>
      )}

      <h1>{msg}</h1>
    </div>
  );
};

export default Message;
