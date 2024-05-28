"use client";

import { useEffect, useState } from "react";
import { createServiceCategory } from "../_api/api";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreateCategory() {
  const fileTypes = ["jpg", "png", "jpeg"];

  const handleInputChange = (event) => {
    setShowCategory(event.target.value);
    setCategorySlug(createSlug(event.target.value));
  };

  const createSlug = (showCategory) => {
    const slug = showCategory.replace(/[^a-zA-Z0-9]/gi, "-");
    return slug.trim().toLowerCase().replace(/-+ /g, "-");
  };

  const handleChange = (file) => {
    setFile(file);
  };

  const [showCategory, setShowCategory] = useState("");
  const [file, setFile] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryFor, setCategoryFor] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading ... ", {
      position: "bottom-right",
    });

    const formData = new FormData();

    formData.append("name", showCategory);
    formData.append("slug", `${categorySlug}-${categoryFor.toLowerCase()}`);
    formData.append("category_barang", categoryFor);
    formData.append("image", file);

    try {
      const res = await createServiceCategory(formData);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      toast.dismiss();
      toast.success(`Category created successfully`, {
        position: "bottom-right",
      });
      router.push(`/dashboard/services/category`);
    } catch (error) {
      toast.dismiss();
      if (
        error.response && // Check if response exists
        error.response.status === 422 && // Check if response status is 422
        error.response.data.errors
      ) {
        const errors = error.response.data.errors;
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
    <div className="mx-5">
      <p className="text-lg font-semibold text-gray-900 mb-5">
        Create New Service Category
      </p>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category name"
              onChange={handleInputChange}
              value={showCategory}
              required
            />
          </div>
          {/* <div className="mb-4 ">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category slug"
              //  onChange={(e) => setCategorySlug(e.target.value)}
              value={categorySlug}
              required
            />
          </div> */}
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Category
          </label>
          <select
            type="text"
            name="categoryFor"
            defaultValue={categoryFor}
            onChange={(e) => setCategoryFor(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option selected>Select Category</option>
            <option>Shoes</option>
            <option>Sandals</option>
            <option>Bag</option>
            <option>Hat</option>
          </select>
        </div>
        <div className="relative z-0 max-w-md mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <FileUploader
            handleChange={handleChange}
            name="image"
            types={fileTypes}
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {" "}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
