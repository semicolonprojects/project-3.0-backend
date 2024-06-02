import ImageCarousel from "../components/ImageCarousel";

const Artikel = () => {
  return (
    <div className="py-5 px-4 tablet:px-8 laptop:px-16 desktop:px-28 desktop:pr-16 max-w-full">
      <p className="py-5 text-[#FFB62B] font-bold text-2xl tablet:text-3xl laptop:text-5xl desktop:text-5xl">
        Artikel
      </p>
      <div>
        <ImageCarousel />
      </div>
    </div>
  );
};

export default Artikel;
