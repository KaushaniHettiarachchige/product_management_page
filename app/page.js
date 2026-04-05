"use client";

import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";
import SearchBar from "../Components/SearchBar";
import ThemeToggle from "../Components/ThemeToggle";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedProducts = window.localStorage.getItem("products");
    const parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];

    Promise.resolve().then(() => {
      setProducts(parsedProducts);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem("products", JSON.stringify(products));
  }, [products, loaded]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price.toString().trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      return;
    }

    if (name === "price") {
      const cleanedValue = value.replace(/LKR\s*/i, "").replace(/[^\d.]/g, "");

      setFormData((prev) => ({
        ...prev,
        price: cleanedValue,
      }));

      setErrors((prev) => ({
        ...prev,
        price: "",
      }));
      
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
    });
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    if (editId) {
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
              ...product,
              ...formData,
              price: Number(formData.price),
            }
          : product
      );

      setProducts(updatedProducts);
      toast.success("Product updated successfully");
    } else {
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image,
      };

      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product added successfully");
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image || "",
    });
    setEditId(product.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.success("Product deleted successfully");

    if (editId === id) {
      resetForm();
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4 dark:bg-slate-950 transition-colors">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
            Product Management Dashboard
          </h1>
          <ThemeToggle />
        </div>

        <ProductForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
          resetForm={resetForm}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loaded ? (
          <ProductList
            products={filteredProducts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-10 text-center text-slate-500 dark:text-slate-300">
            Loading products...
          </div>
        )}
      </div>
    </main>
  );
}