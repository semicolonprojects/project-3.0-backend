"use client";

import { FileUploader } from "react-drag-drop-files";
import TiptapEdit from "../../../../../components/TiptapEdit";
import { useEffect, useState } from "react";
import { detailArtikel, getCategories, updateArtikel } from "../../_api/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = ({ params }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldCategory, setOldCategory] = useState("");
  const [isiArtikel, setIsiArtikel] = useState("");
  const fileTypes = ["jpg", "png", "jpeg"];
  const [file, setFile] = useState("");
  const [contentArtikel, setContentArtikel] = useState("");
  const [artikelId, setartikelId] = useState("");

  const router = useRouter();

  const handleContentChange = (newContent) => {
    setContentArtikel(newContent);
  };

  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchArtikel = async () => {
      try {
        const data = await detailArtikel(params.slug);
        setartikelId(data.data.id);
        setTitle(data.data.judul);
        setDescription(data.data.description);
        setOldCategory(data.data.category_id);
        setIsiArtikel(data.data.isi_artikel);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtikel();
    fetchCategory();
  }, [params.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading ... ", {
      position: "bottom-right",
    });

    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("slug", title);
    formData.append("judul", title);
    formData.append("category_id", oldCategory);
    formData.append("isi_artikel", contentArtikel);
    formData.append("description", description);
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel/${artikelId}`,
        formData
      );

      toast.dismiss();
      toast.success(response.data, {
        position: "bottom-right",
      });
      router.push(`/dashboard/artikel`);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
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
              className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]"
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
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold py-5">Create Artikel</h1>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px]">
        <table className="max-w-[974px] w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
              <div className="">Artikel</div>
            </div>
          </caption>
        </table>

        <div className="mx-5 p-5">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl"
            encType="multipart/form-data"
          >
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Article Title"
                  required
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Caption
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Article caption"
                  required
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div className="grid grid-flow-col">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <Link
                  href="#"
                  className="text-right block mb-2 text-sm font-medium text-gray-900"
                >
                  Manage Category
                </Link>
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={oldCategory}
                onChange={(e) => setOldCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    defaultValue={category.id === oldCategory}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
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
            <div className="mb-5 ">
              <div className="relative z-0 w-full mb-5">
                <label className=" block mb-2 text-sm font-medium text-gray-900">
                  Artikel
                </label>
                <TiptapEdit
                  isiArtikel={isiArtikel}
                  setContentArtikel={handleContentChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default Page;
