"use client";

import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { getService } from "../../_api/api.js";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import toast from "react-hot-toast";

function EditPage({ params }) {
  const fileTypes = ["jpg", "png", "jpeg"];
  
  const handleInputChange = (event) => {
    setServiceName(event.target.value);
    setServiceSlug(createSlug(event.target.value)); // Update slug on service name change
  };

  const createSlug = (serviceName) => {
    const slug = serviceName.replace(/[^a-zA-Z0-9]/gi, '-');
    return slug.trim().toLowerCase().replace(/-+ /g, '-');
  };

  const [file, setFile] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [serviceId, setServiceId] = useState("");

  const router = useRouter();

  const handleChange = (file) => {
    setFile(file);
};

useEffect(() => {
  const detail = async () => {
      try {
          const serviceData = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${params.slug}`
          );
          const res = serviceData.data.data;
          setServiceName(res.nama_service);
          setServiceTitle(res.nama_service);
          setPrice(res.price);
          setServiceSlug(res.slug);
          setcategory(res.category);
          setServiceLink(res.link_wa);
          setServiceId(res.id);
      } catch (error) {
          console.log(error);
      }
  };

  detail();
  }, []);
  
  const updateService = async (e) => {
  e.preventDefault();
  toast.loading("Loading ...", {
    position: "bottom-right",
  });

  const formData = new FormData();


  formData.append("nama_service", serviceName);
  formData.append("slug", serviceSlug);
  formData.append("link_wa", serviceLink);
  formData.append("category", category );
  formData.append("_method", "PUT");
  formData.append("price", price);
  formData.append("image", file);
  
 
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${serviceId}`,
      formData
    );
    console.log("🚀 ~ updateService ~ response:", response);

    toast.dismiss();
    toast.success(response.data, {
      position: "bottom-right",

    });
    router.push(`/dashboard/services`)
  } catch (error) {
    toast.dismiss();
    if (error.response.status === 422 && error.response.data.errors) {
      const errors = error.response.data.errors;
      Object.keys(errors).forEach((field) => {
        errors[field].forEach((errorMessage)=> {
          toast.error(`${field}: ${errorMessage}`, {
            position: "bottom-right",
          });
        });
      });
    } else {
      toast.error("An error occurred. Please try again.", {
        position:"bottom-right",

      });
    }
  }
  };
  return (

    <div className="p-4 ml-80">
      <div className="py-20 pb-10">
        <div className="grid grid-flow-col gap-6 w-fit ">
          <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
          <svg class="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7] " fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path>
            </svg>
          </div>
          <h1 className='text-3xl font-bold py-5'>Services Content Management</h1>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
          <div className="mx-5">
          <p className="text-lg font-semibold text-gray-900 mb-5">Edit Service {serviceTitle} </p>
          <form className=" max-w-4xl" onSubmit={updateService} encType="multipart/form-data">
            <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
              <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                  Service Name
              </label>
              <input 
                    type="text" 
                    id="serviceName" 
                    value={serviceName}
                    onChange={handleInputChange} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5" 
                    placeholder="Service Name"
                    required
                    />
              </div>
              <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                  Service Slug
              </label>
              <input 
                    type="text" 
                    id="serviceSlug" 
                    value={serviceSlug}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5" 
                    placeholder="Service Slug"
                    required
                    disabled
                    />
              </div>  
            </div>
            <div class="grid md:grid-flow-col max-w-4xl gap-5 ">
                            <div className="relative z-0 w-full mb-5 group"> 
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Service Price"
                                required
                            />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
              <div className="grid grid-flow-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category
              </label>
              <button className="text-right block mb-2 text-sm font-medium text-gray-900">
                 Manage Category
              </button>
                </div>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="category"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                            >
                                <option selected>Select Category</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>France</option>
                                <option>Germany</option>
                </select>
              </div>
                        </div>
                        <div className="">
                        <div className="relative z-0 max-w-4xl mb-5"> 
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Link Whatsapp
                            </label>
                            <input
                                type="text"
                                id="link_wa"
                                value={serviceLink}
                                onChange={(e) => setServiceLink(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Service Whatsapp Link"
                                required
                            />
                            </div>
                        </div>
                        <div class="relative z-0 max-w-md mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Image 
                            </label>
                            <FileUploader
                                handleChange={handleChange}
                                name="image"
                                types={fileTypes}
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button> 
          </form>
          </div>
      </div>
    </div>
  )
}

export default EditPage