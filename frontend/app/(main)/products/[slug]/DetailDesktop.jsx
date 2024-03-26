import Image from "next/image";
import Link from "next/link";
import Spinner from "../../../components/Spinner";

const DetailDesktop = ({
  product,
  slicedRandomProducts,
  randomProductsLoading,
}) => {
  return (
    <div className="relative mx-14">
      <div className="grid grid-cols-2">
        <div className="max-w-md w-full h-full">
          {/* <div
            style={{
              width: "100%",
              height: "560px",
              position: "relative",
            }}
          >
            <Image
              alt={product.productName}
              src={product.imageUrl}
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
          </div> */}
          <div className="w-[40rem] h-[30rem] flex justify-center items-center">
            <div className="items-center h-64 w-96 relative">
              <Image
                alt={product.productName}
                src={product.imageUrl}
                layout="fill" // required
                objectFit="fill" // change to suit your needs
              />
            </div>
          </div>
        </div>

        <div className="relative mx-1 my-16">
          <nav className="relative " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    href="/products"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {product.productName}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="grid grid-flow-row">
            <h1 className="text-4xl font-bold">{product.productName}</h1>
            <div className="pt-2">
              <p className="text-xl font-bold">Rp. {product.priceIDR}</p>
            </div>
          </div>
          <div className="my-5">
            <div className="grid grid-flow-row">
              <p>{product.details}</p>
            </div>
            <div className="pt-[72px] grid grid-flow-row ">
              <button className="p-2 font-semibold text-sm text-white max-w-md w-full bg-[#34A853] ">
                <div className="flex items-center justify-center gap-x-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.88595 7.16985C9.06891 7.17475 9.27175 7.18465 9.46474 7.61303C9.59271 7.89821 9.80829 8.42321 9.9839 8.85087C10.1206 9.18366 10.233 9.45751 10.2611 9.51356C10.3254 9.64156 10.365 9.78926 10.2809 9.96156C10.271 9.98188 10.2617 10.0013 10.2526 10.02C10.1852 10.16 10.1372 10.2597 10.0237 10.3899C9.97709 10.4435 9.9285 10.5022 9.88008 10.5607C9.79494 10.6636 9.71035 10.7658 9.63785 10.838C9.50924 10.9659 9.37563 11.1039 9.52402 11.3599C9.6725 11.6159 10.1919 12.4579 10.9587 13.1373C11.783 13.8712 12.4998 14.1805 12.8622 14.3368C12.9325 14.3672 12.9895 14.3918 13.0313 14.4126C13.2886 14.5406 13.4419 14.5209 13.5903 14.3486C13.7388 14.1762 14.2334 13.6001 14.4066 13.3441C14.5748 13.0881 14.7479 13.1275 14.9854 13.2161C15.2228 13.3047 16.4892 13.9251 16.7464 14.0531C16.7972 14.0784 16.8448 14.1012 16.8889 14.1224C17.0678 14.2082 17.1895 14.2665 17.2411 14.3535C17.3054 14.4618 17.3054 14.9739 17.0927 15.5746C16.8751 16.1752 15.8263 16.7513 15.3514 16.7956C15.3064 16.7999 15.2617 16.8053 15.2156 16.8108C14.7804 16.8635 14.228 16.9303 12.2596 16.1555C9.83424 15.2018 8.23322 12.8354 7.90953 12.357C7.88398 12.3192 7.86638 12.2932 7.85698 12.2806L7.8515 12.2733C7.70423 12.0762 6.80328 10.8707 6.80328 9.62685C6.80328 8.43682 7.38951 7.81726 7.65689 7.53467C7.67384 7.51676 7.6895 7.50021 7.70366 7.48494C7.94107 7.22895 8.21814 7.16495 8.39125 7.16495C8.56445 7.16495 8.73756 7.16495 8.88595 7.16985Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.18418 21.3314C2.10236 21.6284 2.37285 21.9025 2.6709 21.8247L7.27824 20.6213C8.7326 21.409 10.37 21.8275 12.0371 21.8275H12.0421C17.5281 21.8275 22 17.3815 22 11.9163C22 9.26735 20.966 6.77594 19.0863 4.90491C17.2065 3.03397 14.7084 2 12.042 2C6.55607 2 2.08411 6.44605 2.08411 11.9114C2.08348 13.65 2.5424 15.3582 3.41479 16.8645L2.18418 21.3314ZM4.86092 17.2629C4.96774 16.8752 4.91437 16.4608 4.71281 16.1127C3.97266 14.8348 3.58358 13.3855 3.58411 11.9114C3.58411 7.28158 7.37738 3.5 12.042 3.5C14.3119 3.5 16.4296 4.37698 18.0281 5.96805C19.6248 7.55737 20.5 9.66611 20.5 11.9163C20.5 16.5459 16.7068 20.3275 12.0421 20.3275H12.0371C10.6206 20.3275 9.22863 19.9718 7.99266 19.3023C7.65814 19.1211 7.26726 19.0738 6.89916 19.17L4.13676 19.8915L4.86092 17.2629Z"
                      fill="white"
                    />
                  </svg>
                  <p className="flex items-center justify-center ">
                    {" "}
                    Order This Product On Whatsapp{" "}
                  </p>
                </div>
              </button>
            </div>
          </div>
          {/* Carousel */}

          <div className="relative pt-14">
            {randomProductsLoading ? (
              <div className="w-auto h-auto flex justify-center items-center ">
                <Spinner />
              </div>
            ) : (
              <>
                <h2 className="font-bold text-4xl flex justify-center">
                  Produk Kami Lainnya{" "}
                </h2>
                <div className=" py-5 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-10">
                  {slicedRandomProducts.map((random) => (
                    <Link
                      href={random.slug}
                      className="group"
                      key={random.slug}
                    >
                      <div className="aspect-h-1 aspect-w-1 w-[200px] h-[287px] overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                        <Image
                          src={random.imageUrl}
                          alt="..."
                          width="217"
                          height="287"
                          loading="lazy"
                          className="h-full w-full object-cover  group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                        {random.productName}
                      </h3>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDesktop;
