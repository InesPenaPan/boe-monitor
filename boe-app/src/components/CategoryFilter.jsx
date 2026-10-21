/**
 * Renders the category filter button group.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string[]} props.categories - List of category labels.
 * @param {string} props.selectedCategory - Currently active category.
 * @param {Function} props.onSelectCategory - Callback triggered on category selection.
 * @returns {JSX.Element} The rendered category filter toolbar.
 */
export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelectCategory(cat)}
          className={`px-3.5 py-1.5 text-xs transition cursor-pointer border ${
            selectedCategory === cat
              ? 'bg-[#002b49] text-white border-[#002b49] shadow-xs'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}