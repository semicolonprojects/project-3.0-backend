import ImageCarousel from "../components/ImageCarousel";

const Artikel = () => {
  return (
    <div className="py-5 pb-2 px-4 phone2:px-[42px] tablet:px-8 laptop:px-32 laptop:pr-0 laptop-lg:px-16 desktop:px-28 desktop:pr-16 desktop-sm:mx-3  desktop-lg:mx-20 max-w-full">
      <p className="py-5 text-[#FFB62B] font-bold text-2xl tablet:text-3xl laptop:text-4xl laptop-lg:text-5xl desktop:text-5xl  desktop-lg:text-6xl">
        Artikel
      </p>
      <div>
        <ImageCarousel />
      </div>
    </div>
  );
};

export default Artikel;
