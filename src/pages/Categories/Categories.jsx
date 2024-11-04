import GlobalTitle from "../../components/GlobalTitle/GlobalTitle";
import Category from "../../components/Category/Category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanCategories, getCategories } from "../../store/categoriesSlice";
import Loading from "../../components/Loading/Loading";

const Categories = () => {
  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());

    return () => dispatch(cleanCategories());
  }, [dispatch]);

  return (
    <section className="Categories">
      <GlobalTitle title={"Categories"} />

      <Loading
        isLoading={isLoading}
        error={error}
        data={categories}
        msg={"Categories is empty"}
      >
        <div className="container row m-auto align-items-center justify-content-center gap-3 gap-md-5">
          {categories.map((cat) => {
            return <Category key={cat.id} cat={cat} />;
          })}
        </div>
      </Loading>
    </section>
  );
};

export default Categories;
