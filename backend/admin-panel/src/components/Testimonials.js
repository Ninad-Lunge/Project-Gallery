import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ name: '', content: '', id: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTestimonial = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, content: formData.content }),
      });
      const data = await response.json();
      setTestimonials([...testimonials, data]);
      setFormData({ name: '', content: '', id: '' });
    } catch (error) {
      console.error('Error adding testimonial:', error);
    }
  };

  const updateTestimonial = async () => {
    try {
      const response = await fetch(`/api/testimonials/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, content: formData.content }),
      });
      const updatedTestimonial = await response.json();

      setTestimonials(testimonials.map((test) => (test._id === formData.id ? updatedTestimonial : test)));
      setIsEditing(false);
      setFormData({ name: '', content: '', id: '' });
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter((test) => test._id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateTestimonial() : addTestimonial();
  };

  const editTestimonial = (testimonial) => {
    setFormData({ name: testimonial.name, content: testimonial.content, id: testimonial._id });
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Testimonials</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Person's Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="content"
          placeholder="Testimonial Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows="3"
        />
        
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
          >
            {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
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
        {testimonials.map((testimonial) => (
          <li key={testimonial._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.content}</p>
            <div className="mt-3 flex items-center space-x-4">
              <button
                onClick={() => editTestimonial(testimonial)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTestimonial(testimonial._id)}
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

export default Testimonials;