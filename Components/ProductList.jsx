import ProductCard from "./ProductCard";

export default function ProductList({ products, handleEdit, handleDelete }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          All Products
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Total Products: {products.length}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-10 text-center text-slate-500 dark:text-slate-300 transition-colors">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}