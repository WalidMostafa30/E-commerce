import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { useLayoutEffect } from "react";

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);

    return children;
  };

  return (
    <main>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </main>
  );
}

export default App;
