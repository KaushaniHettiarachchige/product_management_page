export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-4 transition-colors">
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  );
}