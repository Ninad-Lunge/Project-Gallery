import React, { useState, useEffect } from 'react';

const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', id: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await fetch('/api/technologies');
      const data = await response.json();
      setTechnologies(data);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTechnology = async () => {
    try {
      const response = await fetch('/api/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const data = await response.json();
      setTechnologies([...technologies, data]);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error adding technology:', error);
    }
  };

  const updateTechnology = async () => {
    try {
      const response = await fetch(`/api/technologies/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, description: formData.description }),
      });
      const updatedTechnology = await response.json();

      setTechnologies(technologies.map((tech) => (tech._id === formData.id ? updatedTechnology : tech)));
      setIsEditing(false);
      setFormData({ name: '', description: '', id: '' });
    } catch (error) {
      console.error('Error updating technology:', error);
    }
  };

  const deleteTechnology = async (id) => {
    try {
      await fetch(`/api/technologies/${id}`, { method: 'DELETE' });
      setTechnologies(technologies.filter((tech) => tech._id !== id));
    } catch (error) {
      console.error('Error deleting technology:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateTechnology() : addTechnology();
  };

  const editTechnology = (technology) => {
    setFormData({ name: technology.name, description: technology.description, id: technology._id });
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Technologies</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Technology Name"
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
            {isEditing ? 'Update Technology' : 'Add Technology'}
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
        {technologies.map((technology) => (
          <li key={technology._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold">{technology.name}</h4>
            <p className="text-gray-600">{technology.description}</p>
            <div className="mt-3 flex items-center space-x-4">
              <button
                onClick={() => editTechnology(technology)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTechnology(technology._id)}
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

export default Technologies;