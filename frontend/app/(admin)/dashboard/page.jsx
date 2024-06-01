import Image from "next/image";
import Promo from "./Promo";
import CardInfo from "./CardInfo";

const home = () => {
  return (
    <>
      <div className="p-4 sm:ml-80">
        <CardInfo />
        <Promo />
        <div className="grid grid-flow-col gap-2 pb-5">
          <div className="rounded-md bg-white w-72 p-4 pt-2">
            <div className="grid grid-flow-col gap-14">
              <p className="font-bold text-xl pb-2">Preview Artikel</p>
              <button className="p-2">
                <svg
                  className="w-7 h-7"
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="bg-slate-200 w-64 p-4">
              <Image
                src="https://images.unsplash.com/photo-1682687219612-b12805df750d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
                width={300}
                height={300}
                className="object-fill w-full "
              />
              <h1 className="my-2 font-bold text-xl">Judul Artikel</h1>
              <p className="text-base font-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.{" "}
              </p>
            </div>
          </div>
          <div className="rounded-md bg-white w-72 p-4 pt-2">
            <div className="grid grid-flow-col gap-14">
              <p className="font-bold text-xl pb-2">Preview Artikel</p>
              <button className="p-2">
                <svg
                  className="w-7 h-7"
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="bg-slate-200 w-64 p-4">
              <Image
                src="https://images.unsplash.com/photo-1682687219612-b12805df750d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
                width={300}
                height={300}
                className="object-fill w-full "
              />
              <h1 className="my-2 font-bold text-xl">Judul Artikel</h1>
              <p className="text-base font-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.{" "}
              </p>
            </div>
          </div>
          <div className="rounded-md bg-white w-72 p-4 pt-2">
            <div className="grid grid-flow-col gap-14">
              <p className="font-bold text-xl pb-2">Preview Artikel</p>
              <button className="p-2">
                <svg
                  className="w-7 h-7"
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="bg-slate-200 w-64 p-4">
              <Image
                src="https://images.unsplash.com/photo-1682687219612-b12805df750d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
                width={300}
                height={300}
                className="object-fill w-full "
              />
              <h1 className="my-2 font-bold text-xl">Judul Artikel</h1>
              <p className="text-base font-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
