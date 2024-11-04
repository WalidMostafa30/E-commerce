import Banner from "../../components/Banner/Banner";
import BestRate from "../BestRate/BestRate";
import Landing from "../Landing/Landing";
import NewProducts from "../NewProducts/NewProducts";
import Services from "../Services/Service";

const Home = () => {
  return (
    <article className="Home">
      <Landing />
      <NewProducts />
      <Banner />
      <BestRate />
      <Services />
    </article>
  );
};

export default Home;
