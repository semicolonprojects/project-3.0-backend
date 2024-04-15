import Dashboard from "../page";
import React from 'react'
import Image from 'next/image';

const home = () => {
  return (
    <>
    <Dashboard/>
  <div className="p-4 sm:ml-80">
    <div className="grid grid-flow-col gap-2 py-20 pb-5">
      <div className=" bg-white w-72 p-4 rounded-md shadow-sm">
        <div className="grid grid-flow-row">
         <p className="font-bold text-2xl">Products</p>
         <p className="font-extrabold text-4xl">100</p>
        </div>
      </div>
      <div className=" bg-white w-72 p-4 rounded-md shadow-sm">
        <div className="grid grid-flow-row">
         <p className="font-bold text-2xl">Services</p>
         <p className="font-extrabold text-4xl">100</p>
        </div>
      </div>
      <div className=" bg-white w-72 p-4 rounded-md shadow-sm">
        <div className="grid grid-flow-row">
         <p className="font-bold text-2xl">Artikel</p>
         <p className="font-extrabold text-4xl">100</p>
        </div>
    </div>
    </div>
    <div className="bg-white w-[96%] rounded-md shadow-sm p-4 mb-5"> 
    <div className="grid grid-flow-col">
      <div className="items-start">
        <h1 className="font-bold text-2xl" >Promos</h1>
      </div>
      <div className="text-right">
        <button className="bg-green-500 hover:bg-green-400 px-5 p-2 rounded-lg" >
          <p className="text-base font-semibold" >Add Promos</p> 
        </button>
      </div>
    </div>
    <div className="grid grid-flow-col gap-2 py-10 px-5 pl-10" >
      <div className="bg-slate-200 rounded-lg p-2 h-44 w-44">
        <div className="grid grid-cols-2 gap-24 border-b border-slate-300">
          <p className="pt-1 text-md font-bold" >Promo</p>
          <button className="p-1">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
          </svg>
          </button>
        </div>
        <p className="text-base font-bold py-2 pb-0">Judul Promo</p>
        <p className="text-sm pb-2" >Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p className="text-sm font-bold" >15-04-2024</p>
      </div>
      <div className="bg-slate-200 rounded-lg p-2 h-44 w-44">
        <div className="grid grid-cols-2 gap-24 border-b border-slate-300">
          <p className="pt-1 text-md font-bold" >Promo</p>
          <button className="p-1">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
          </svg>
          </button>
        </div>
        <p className="text-base font-bold py-2 pb-0">Judul Promo</p>
        <p className="text-sm pb-2" >Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p className="text-sm font-bold" >15-04-2024</p>
      </div>
      <div className="bg-slate-200 rounded-lg p-2 h-44 w-44">
        <div className="grid grid-cols-2 gap-24 border-b border-slate-300">
          <p className="pt-1 text-md font-bold" >Promo</p>
          <button className="p-1">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
          </svg>
          </button>
        </div>
        <p className="text-base font-bold py-2 pb-0">Judul Promo</p>
        <p className="text-sm pb-2" >Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p className="text-sm font-bold" >15-04-2024</p>
      </div>
      <div className="bg-slate-200 rounded-lg p-2 h-44 w-44">
        <div className="grid grid-cols-2 gap-24 border-b border-slate-300">
          <p className="pt-1 text-md font-bold" >Promo</p>
          <button className="p-1">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
          </svg>
          </button>
        </div>
        <p className="text-base font-bold py-2 pb-0">Judul Promo</p>
        <p className="text-sm pb-2" >Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p className="text-sm font-bold" >15-04-2024</p>
      </div>
    </div>
    <div>
      
    </div>
    </div>
    <div className="grid grid-flow-col gap-2 pb-5"> 
      <div className="rounded-md bg-white w-72 p-4 pt-2"> 
        <div className="grid grid-flow-col gap-14">
        <p className="font-bold text-xl pb-2">Preview Artikel</p>
        <button className="p-2">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
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
          <p className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil. </p>
        </div>
      </div>
      <div className="rounded-md bg-white w-72 p-4 pt-2"> 
        <div className="grid grid-flow-col gap-14">
        <p className="font-bold text-xl pb-2">Preview Artikel</p>
        <button className="p-2">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
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
          <p className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil. </p>
        </div>
      </div>
      <div className="rounded-md bg-white w-72 p-4 pt-2"> 
        <div className="grid grid-flow-col gap-14">
        <p className="font-bold text-xl pb-2">Preview Artikel</p>
        <button className="p-2">
          <svg className="w-7 h-7" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
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
          <p className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil. </p>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default home