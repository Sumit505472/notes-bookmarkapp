export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{note.title}</h3>
        <button
          onClick={() => onToggleFavorite(note._id, !note.isFavorite)}
          className={`text-2xl transition ${note.isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map(tag => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
