import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import Beetle from "./components/pages/Beetle";
import PliersBeetle from "./components/pages/PliersBeetle";
import BeetleFood from "./components/pages/BeetleFood";
import BeetleFeedingEquipment from "./components/pages/BeetleFeedingEquipment";
import BestSelling from "./components/pages/BestSelling";
import TopRated from "./components/pages/TopRated";
import Order from "./components/pages/Order";
import TrendingProducts from "./components/pages/Trendingproducts"; 


import AOS from "aos";
import "aos/dist/aos.css";



const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero handleOrderPopup={handleOrderPopup} />
                <Products />
                <TopProducts handleOrderPopup={handleOrderPopup} />
                <Banner />
                <Subscribe />
                <Products />
                <Testimonials />
                <Footer />
              </>
            } 
          />
          <Route path="/beetle" element={<Beetle />} />
          <Route path="/pliers-beetle" element={<PliersBeetle />} />
          <Route path="/beetle-food" element={<BeetleFood />} />
          <Route path="/beetle-feeding-equipment" element={<BeetleFeedingEquipment />} />
          <Route path="/trending-products" element={<TrendingProducts />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/order" element={<Order />} />

        </Routes>
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </Router>
  );
};

export default App;
