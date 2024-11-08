import React, { useState, useEffect } from 'react';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', id: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTag = async () => {
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const data = await response.json();
      setTags([...tags, data]);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const updateTag = async () => {
    try {
      const response = await fetch(`/api/tags/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const updatedTag = await response.json();

      setTags(tags.map((tag) => (tag._id === formData.id ? updatedTag : tag)));
      setIsEditing(false);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const deleteTag = async (id) => {
    try {
      await fetch(`/api/tags/${id}`, { method: 'DELETE' });
      setTags(tags.filter((tag) => tag._id !== id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateTag() : addTag();
  };

  const editTag = (tag) => {
    setFormData({ name: tag.name, description: tag.description, id: tag._id });
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Tags</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tag Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
          >
            {isEditing ? 'Update Tag' : 'Add Tag'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <ul className="space-y-4">
        {tags.map((tag) => (
          <li key={tag._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold">{tag.name}</h4>
            <p className="text-gray-600">{tag.description}</p>
            <div className="mt-3 flex items-center space-x-4">
              <button
                onClick={() => editTag(tag)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTag(tag._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;