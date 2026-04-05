export default function ProductCard({ product, handleEdit, handleDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col w-full transition-colors">
      <div className="h-36 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden p-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-slate-500 dark:text-slate-400 text-xs">
            No Image Available
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          LKR {Number(product.price).toLocaleString()}
        </p>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 grow line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-center gap-2 mt-auto">
          <button
            onClick={() => handleEdit(product)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1.5 rounded-lg text-xs font-medium transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(product.id)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-1.5 rounded-lg text-xs font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}