import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', id: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://project-gallery-dqq8.onrender.com/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCategory = async () => {
    try {
      const response = await fetch('https://project-gallery-dqq8.onrender.com/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const data = await response.json();
      setCategories([...categories, data]);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(`https://project-gallery-dqq8.onrender.com/api/categories/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const updatedCategory = await response.json();

      setCategories(categories.map((cat) => (cat._id === formData.id ? updatedCategory : cat)));
      setIsEditing(false);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`https://project-gallery-dqq8.onrender.com/api/categories/${id}`, { method: 'DELETE' });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateCategory() : addCategory();
  };

  const editCategory = (category) => {
    setFormData({ name: category.name, description: category.description, id: category._id });
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Categories</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
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
            {isEditing ? 'Update Category' : 'Add Category'}
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
        {categories.map((category) => (
          <li key={category._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold">{category.name}</h4>
            <p className="text-gray-600">{category.description}</p>
            <div className="mt-3 flex items-center space-x-4">
              <button
                onClick={() => editCategory(category)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(category._id)}
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

export default Categories;