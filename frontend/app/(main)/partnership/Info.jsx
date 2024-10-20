import WhiteShoes from "../../../public/img/sepatu_putih(home).png";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <div className="px-28 w-full h-screen">
        <Image
          src={WhiteShoes}
          alt="White Shoes"
          fill
          objectFit="cover"
          objectPosition="center"
          className="w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.72] flex items-center justify-center">
          <div className="text-white text-center p-10 tablet:p-0 w-screen tablet:w-fit max-h-screen md:max-h-max">
            <div className="h-48 tablet:h-auto">
              <p className="text-[#FFB62B] font-bold text-4xl tablet:text-5xl py-16 tablet:py-5">
                About Our <br />
                Partnership Program
              </p>
            </div>
            <div className="max-w-lg max-h-screen">
              <p className="text-[#4EAEFD] break-normal text-justify tracking-tighter	 py-2 font-semibold text-base tablet:text-xl">
                Di era modern saat ini sudah waktunya untuk kita saling bermitra
                agar mendapatkan potensi pasar yang lebih luas dan spesifik.
                Mari ambil potensi besar dalam jasa laundry Sepatu
                bersama Nettoyer.Shoes
              </p>
            </div>
            <div className="py-4 tablet:py-10">
              <a
                target="_blank"
                href="https://wa.me/6281232750957?text=Terimakasih%20atas%20minat%20anda%20untuk%20bekerjasama%20dengan%20Nettoyer.Shoes.%20Sebelum%20memasuki%20tahap%20lebih%20lanjut%20silahkan%20mengisi%20form%20di%20bawah%20ini%0ANama%20%3A%0AAlamat%20%3A%20%0ANo%20Hp%20%3A%20%0AStatus%20%3A%20%28pensiun%2Fpegawai%2Fdll%29%0A%0ATerimakasih%20atas%20perhatianya.%0A%0ASalam%20hangat"
                className="gap-2 flex-row justify-center text-white bg-[#34A853] hover:bg-[#2e7c49] focus:ring-4 focus:outline-none focus:ring-[#5aa476] font-medium rounded-lg text-xl w-full py-4 inline-flex items-center me-2 mb-2"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.88595 5.16985C7.06891 5.17475 7.27175 5.18465 7.46474 5.61303C7.59271 5.89821 7.80829 6.42321 7.9839 6.85087C8.12055 7.18366 8.233 7.45751 8.26114 7.51356C8.32544 7.64156 8.36502 7.78926 8.28093 7.96156C8.27102 7.98188 8.26165 8.00132 8.25264 8.02003C8.18518 8.16003 8.13717 8.25966 8.02373 8.38994C7.97709 8.44348 7.9285 8.50219 7.88008 8.56069C7.79494 8.66358 7.71035 8.7658 7.63785 8.83802C7.50924 8.96593 7.37563 9.10391 7.52402 9.35991C7.6725 9.6159 8.19192 10.4579 8.95868 11.1373C9.783 11.8712 10.4998 12.1805 10.8622 12.3368C10.9325 12.3672 10.9895 12.3918 11.0313 12.4126C11.2886 12.5406 11.4419 12.5209 11.5903 12.3486C11.7388 12.1762 12.2334 11.6001 12.4066 11.3441C12.5748 11.0881 12.7479 11.1275 12.9854 11.2161C13.2228 11.3047 14.4892 11.9251 14.7464 12.0531C14.7972 12.0784 14.8448 12.1012 14.8889 12.1224C15.0678 12.2082 15.1895 12.2665 15.2411 12.3535C15.3054 12.4618 15.3054 12.9739 15.0927 13.5746C14.8751 14.1752 13.8263 14.7513 13.3514 14.7956C13.3064 14.7999 13.2617 14.8053 13.2156 14.8108C12.7804 14.8635 12.228 14.9303 10.2596 14.1555C7.83424 13.2018 6.23322 10.8354 5.90953 10.357C5.88398 10.3192 5.86638 10.2932 5.85698 10.2806L5.8515 10.2733C5.70423 10.0762 4.80328 8.87067 4.80328 7.62685C4.80328 6.43682 5.38951 5.81726 5.65689 5.53467C5.67384 5.51676 5.6895 5.50021 5.70366 5.48494C5.94107 5.22895 6.21814 5.16495 6.39125 5.16495C6.56445 5.16495 6.73756 5.16495 6.88595 5.16985Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.18418 19.3314C0.102363 19.6284 0.372852 19.9025 0.6709 19.8247L5.27824 18.6213C6.7326 19.409 8.37 19.8275 10.0371 19.8275H10.0421C15.5281 19.8275 20 15.3815 20 9.91626C20 7.26735 18.966 4.77594 17.0863 2.90491C15.2065 1.03397 12.7084 0 10.042 0C4.55607 0 0.0841071 4.44605 0.0841071 9.91136C0.0834837 11.65 0.542402 13.3582 1.41479 14.8645L0.18418 19.3314ZM2.86092 15.2629C2.96774 14.8752 2.91437 14.4608 2.71281 14.1127C1.97266 12.8348 1.58358 11.3855 1.58411 9.91136C1.58411 5.28158 5.37738 1.5 10.042 1.5C12.3119 1.5 14.4296 2.37698 16.0281 3.96805C17.6248 5.55737 18.5 7.66611 18.5 9.91626C18.5 14.5459 14.7068 18.3275 10.0421 18.3275H10.0371C8.62061 18.3275 7.22863 17.9718 5.99266 17.3023C5.65814 17.1211 5.26726 17.0738 4.89916 17.17L2.13676 17.8915L2.86092 15.2629Z"
                    fill="white"
                  />
                </svg>
                Chat us on Whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20"></div>
    </>
  );
};

export default Info;
