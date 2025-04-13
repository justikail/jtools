import Link from "next/link";
import { useState } from "react";

function SearchModal({ setShowModal, menuItems }) {
  const [query, setQuery] = useState("");

  const allLinks = menuItems.flatMap((category) => category.links);
  const filteredLinks = allLinks.filter((link) => link.label.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <dialog id="search-modal" className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowModal(false)}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Search Tools</h3>
        <label className="input input-bordered flex items-center gap-2 w-full mt-4">
          <input type="text" className="grow w-full" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </label>

        {filteredLinks.length > 0 ? (
          <ul className="mt-4 max-h-56 border border-base-content/15 rounded-lg p-2 overflow-y-scroll">
            {filteredLinks.map((link) => (
              <li key={link.href} className="py-1">
                <Link href={link.href} className="link link-hover hover:text-yellow-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No results found for &quot;{query}&quot;</p>
        )}
      </div>
    </dialog>
  );
}

export default SearchModal;
