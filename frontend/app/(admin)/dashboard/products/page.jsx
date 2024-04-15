import React from 'react'
import Dashboard from "../page";

const Products = () => {
  return (
   <>
   <Dashboard/>
   <div className='p-4 ml-80'>
      <div className='py-20 pb-10'>
        <div className='grid grid-flow-col gap-6 w-fit'>
          <div className='p-4 bg-white bg-opacity-45 rounded-xl shadow-lg'>
        <svg class="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]  " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </div>
        <h1 className='text-3xl font-bold py-5'>Products Content Management</h1>
        </div>
      </div>
    <div class="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px]">
    <table class="max-w-[974px] w-full text-sm text-left text-gray-500">
        <caption class="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div className=''>
            Products
            <p class="mt-1 text-sm font-normal text-pretty text-gray-500 ">Berisi List-list product yang ditunjukkan di dalam company profile, anda dapat menambah, merubah dan menghapus product yang akan ditampilkan</p>
            </div>
            <button className="bg-green-500 hover:bg-green-400 inline-flex items-center  text-white p-2 rounded-lg w-72 " >
            <svg className='left-0 w-5 h-5 mx-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
            <span className='text-sm'>Add New Product </span>
            </button>
            </div>
        </caption>
        <thead class="bg-white bg-opacity-45 text-xs border-b text-gray-700 uppercase ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nama Product
                </th>
                <th scope="col" class="px-6 py-3">
                    Category Product
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Preview Image
                </th>
                <th scope="col" class="px-12 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b hover:bg-white hover:bg-opacity-70">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-1 py-3 text-right">
                  <div className='grid grid-flow-col gap-1'>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ml-2' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>                 
                  <span className='inline-flex text-xs'>Preview </span>
                  </button>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
                  </svg>                 
                  <span className='inline-flex text-xs'>Edit </span>
                  </button>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ml-2' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"></path>
                  </svg>              
                  <span className='inline-flex text-xs'>Delete</span>
                  </button>
                  </div>
                </td>
            </tr>
            <tr class=" border-b hover:bg-white hover:bg-opacity-70">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-1 py-3 text-right">
                  <div className='grid grid-flow-col gap-1'>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ml-2' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>                 
                  <span className='inline-flex text-xs'>Preview </span>
                  </button>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
                  </svg>                 
                  <span className='inline-flex text-xs'>Edit </span>
                  </button>
                  <button className='grid grid-flow-row text-gray-600'>
                  <svg className='w-6 h-6 ml-2' data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"></path>
                  </svg>              
                  <span className='inline-flex text-xs'>Delete</span>
                  </button>
                  </div>
                </td>
            </tr>
          
        </tbody>
    </table>
</div>

   </div>
   </>
  )
}

export default Products