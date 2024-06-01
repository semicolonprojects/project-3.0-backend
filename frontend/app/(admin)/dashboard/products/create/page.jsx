"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import { getAllCategory } from "../category/_api/api";

const Page = () => {
  const fileTypes = ["jpg", "png", "jpeg"];

  const [file, setFile] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [templateMessage, setTemplateMessage] = useState("");
  const [description, setDescription] = useState("");
  const [getCategory, setGetCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getAllCategory();
        const res = categories.data;
        setGetCategory(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleChange = (file) => {
    setFile(file);
  };

  const createSlug = (productName) => {
    const slug = productName.replace(/[^a-zA-Z0-9]/gi, "-");
    return slug.trim().toLowerCase().replace(/-+ /g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading ... ", {
      position: "bottom-right",
    });

    const formData = new FormData();

    formData.append("product_name", productName);
    formData.append("slug", createSlug(productName));
    formData.append("category", category);
    formData.append("template_message", templateMessage);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
        formData
      );

      toast.dismiss();
      toast.success(response.data, {
        position: "bottom-right",
      });
      router.push(`/dashboard/products`);
    } catch (error) {
      toast.dismiss();
      if (error.response.status === 422 && error.response.data) {
        const errors = error.response.data;
        console.log("🚀 ~ handleSubmit ~ errors:", errors);
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((errorMessage) => {
            toast.error(`${field}: ${errorMessage}`, {
              position: "bottom-right",
            });
          });
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="p-4 ml-80">
      <div className="py-20 pb-10">
        <div className="grid grid-flow-col gap-6 w-fit">
          <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
            <svg
              className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]  "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold py-5">
            Products Content Management
          </h1>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
        <div className="mx-5">
          <p className="text-lg font-semibold text-gray-900 mb-5">
            Create New Products{" "}
          </p>
          <form
            className="max-w-4xl"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
              <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <div className="grid grid-flow-col">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <Link
                    href="/dashboard/products/category"
                    className="text-right block mb-2 text-sm font-medium text-gray-900"
                  >
                    Manage Category
                  </Link>
                </div>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="category"
                  defaultValue={category}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option>Select Option</option>
                  {getCategory.map((categoryList) => (
                    <option key={categoryList.id} value={categoryList.name}>
                      {categoryList.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Template Pesan
                </label>
                <input
                  type="text"
                  id="templateMessage"
                  value={templateMessage}
                  onChange={(e) => setTemplateMessage(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Product Description"
                  required
                />
              </div>
            </div>
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Product Description"
                  required
                />
              </div>
            </div>
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Product Price"
                  required
                />
              </div>
            </div>
            <div className="relative z-0 max-w-sm h-full mb-5 ">
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
  );
};

export default Page;
