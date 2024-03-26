"use client";
import Image from "next/image";
import WhiteShoes from "../../public/img/sepatu_putih(home).png";
import gif from "../../public/img/Video estetik sementara.gif";

const About = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden tablet:block w-full h-auto">
        <div className="hidden tablet:block relative">
          <Image
            src={WhiteShoes}
            alt="White Shoes"
            className="w-full h-auto tablet:w-full desktop:w-full object-fill"
          />
        </div>
      </div>

      <div className="hidden tablet:block text-[#FFB62B] font-bold tablet:absolute tablet:px-32 px-3 py-10 tablet:py-32 ">
        <div className="inline-flex tablet:grid tablet:grid-rows-2">
          <p className="text-4xl tablet:text-5xl lg:text-5xl xl:text-6xl">
            Nettoyer
          </p>
          <div className="block px-3 tablet:px-0 tablet:relative tablet:flex items-center">
            <p className="text-4xl tablet:text-5xl lg:text-5xl xl:text-6xl">
              Shoes
            </p>
            <div className="hidden tablet:block tablet:h-10 bg-blue-500 w-1 ml-1.5 tablet:ml-2 mt-2 "></div>
            <div className="pl-0 tablet:pl-1">
              <p className="text-[#FFB62B] text-base mt-1 tablet:mt-2 -ml-[175px] tablet:ml-0 tablet:relative tablet:text-base ">
                Make Your Foot <br /> Sparks
              </p>
            </div>
          </div>
        </div>
        <div className="pt-2 font-semibold tablet:font-semibold tablet:pt-5 px-1 tablet:px-0 text-[#4EAEFD] text-sm tablet:text-base tracking-tighter leading-relaxed max-w-96">
          <p>
            Nettoyer Shoes merupakan usaha di bidang jasa laundry sepatu, tas,
            dan topi yang berdiri di kota Malang sejak tahun 2019.
            Nettoyer.Shoes beralamatkan di Jl. Danau Ranau VI G5i7 sawojajar,
            Kota Malang, Jawa Timur. Saat ini kami sudah berhasil menangani
            lebih dari ribuan pasang Sepatu, ratusan tas dan topi, yang berarti
            sudah dipercaya oleh Masyarakat kota Malang untuk menjadi partner
            mereka dalam perawatan Sepatu, tas, dan topi. Pada tahun 2022
            Nettoyer.Shoes mulai melebarkan sayapnya ke Kota Purwokerto untuk
            membantu Masyarakat Purwokerto merawat Sepatu, tas, dan topinya.
            Cabang ke 2 ini mulai diperkenalkan pada tanggal 24 September 2022.
          </p>
        </div>
      </div>

      {/* Mobile  View */}

      <div className="block tablet:hidden px-28 w-full h-screen">
        <Image
          src={gif}
          alt="White Shoes"
          fill
          objectFit="cover"
          objectPosition="center"
          className="w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.72] flex items-center justify-center">
          <div className="text-white text-center p-10 tablet:p-0 w-screen tablet:w-fit max-h-screen md:max-h-max">
            <div className="absolute inset-x-16 bottom-0">
              <p className="text-center py-10 text-[#FFB62B] text-2xl font-bold">
                Make Your Foot Sparks !
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="block tablet:hidden px-7">
        <p className="text-yellow-500 py-5 pb-2 font-bold text-2xl px-1">About Us</p>
        <div className="font-semibold tablet:font-semibold tablet:pt-5 px-1 tablet:px-0 text-[#4EAEFD] text-sm tablet:text-base text-pretty leading-normal  max-w-96">
          <p>
            Nettoyer Shoes merupakan usaha di bidang jasa laundry sepatu, tas,
            dan topi yang berdiri di kota Malang sejak tahun 2019.
            Nettoyer Shoes beralamatkan di Jl. Danau Ranau VI G5i7 sawojajar,
            Kota Malang, Jawa Timur. Saat ini kami sudah berhasil menangani
            lebih dari ribuan pasang Sepatu, ratusan tas dan topi, yang berarti
            sudah dipercaya oleh Masyarakat kota Malang untuk menjadi partner
            mereka dalam perawatan Sepatu, tas, dan topi. Pada tahun 2022
            Nettoyer.Shoes mulai melebarkan sayapnya ke Kota Purwokerto untuk
            membantu Masyarakat Purwokerto merawat Sepatu, tas, dan topinya.
            Cabang ke 2 ini mulai diperkenalkan pada tanggal 24 September 2022.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
