import { useRef } from "react";

export default function ProductForm({
  formData,
  errors,
  handleChange,
  handleSubmit,
  editId,
  resetForm,
}) {
  const fileInputRef = useRef(null);

  const handleFormSubmit = (e) => {
    handleSubmit(e);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    resetForm();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 mb-8 transition-colors">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
        {editId ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Price
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-800 dark:text-slate-200">
              LKR
            </span>

            <input
              type="text"
              inputMode="decimal"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-16 pr-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-400"
          />

          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border border-slate-300 dark:border-slate-700"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 dark:bg-sky-600 dark:hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}