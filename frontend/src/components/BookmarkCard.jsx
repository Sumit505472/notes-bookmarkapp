export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-purple-500">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{bookmark.title || 'Untitled'}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            {bookmark.url}
          </a>
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark._id, !bookmark.isFavorite)}
          className={`text-2xl transition ml-2 ${bookmark.isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      </div>

      {bookmark.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{bookmark.description}</p>
      )}

      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {bookmark.tags.map(tag => (
            <span
              key={tag}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(bookmark)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(bookmark._id)}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
