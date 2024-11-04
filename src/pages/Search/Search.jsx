import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanSearch, changeSearch } from "../../store/searchSlice";
import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import { getSearchProducts } from "../../store/searchSlice";
import Message from "../../components/Message/Message";
import emptyImg from "../../assets/images/emptyImg.svg";

const Search = () => {
  const { filterSearch, msg } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const onChangeSearch = (e) => {
    const title = e.target.value;
    setInput(title);
    dispatch(changeSearch(title));
  };

  useEffect(() => {
    inputRef.current.focus();
    dispatch(getSearchProducts());

    return () => dispatch(cleanSearch());
  }, [dispatch]);

  return (
    <section className="container">
      <GlobalTitle title={"Search"} />

      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={input}
        onChange={onChangeSearch}
        className="w-100 fs-5 p-2 rounded-2 mb-2"
        style={{ outline: "none", border: "2px solid var(--main-color)" }}
      />

      {msg.length > 0 ? (
        <Message msg={msg} msgImg={emptyImg} />
      ) : (
        <div className="d-flex flex-column gap-2">
          {filterSearch.map((pro) => {
            return (
              <Link
                key={pro.id}
                to={`/categories/products/${pro.catPrefix}/${pro.id}`}
                className="d-flex align-items-center gap-2 rounded-2 overflow-hidden"
                style={{ border: "2px solid var(--main-color)" }}
              >
                <div
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                  }}
                >
                  <img
                    className="w-100"
                    src={pro.images && pro.images[0]}
                    loading="lazy"
                    alt={pro.title}
                  />
                </div>
                <h4>{pro.title}</h4>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;
