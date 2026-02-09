import { useState } from 'react';

export default function TagFilter({ tags, onFilter }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTag, setInputTag] = useState('');

  const handleAddTag = (tag) => {
    if (tag && !selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onFilter(newTags.join(','));
      setInputTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    onFilter(newTags.join(','));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag(inputTag.trim());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add tag..."
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleAddTag(inputTag.trim())}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Add
        </button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
