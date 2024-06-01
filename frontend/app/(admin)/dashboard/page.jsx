import Promo from "./Promo";
import CardInfo from "./CardInfo";
import ArtikelCarousel from "./ArtikelCarousel";

const home = () => {
  return (
    <div className="p-4 sm:ml-80">
      <CardInfo />
      <Promo />
      <ArtikelCarousel />
    </div>
  );
};

export default home;
