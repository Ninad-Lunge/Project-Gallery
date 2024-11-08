import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    projectLink: '',
    category: '',
    technologies: [],
    tags: [],
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await fetch('https://project-gallery-dqq8.onrender.com/api/categories');
      const technologiesResponse = await fetch('https://project-gallery-dqq8.onrender.com/api/technologies');
      const tagsResponse = await fetch('https://project-gallery-dqq8.onrender.com/api/tags');
      
      setAvailableCategories(await categoriesResponse.json());
      setAvailableTechnologies(await technologiesResponse.json());
      setAvailableTags(await tagsResponse.json());
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://project-gallery-dqq8.onrender.com/api/projects');
      setProjects(await response.json());
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Array.from(e.target.selectedOptions, option => option.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(isEditing ? `https://project-gallery-dqq8.onrender.com/api/projects/${formData.id}` : 'https://project-gallery-dqq8.onrender.com/api/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchProjects();
        setFormData({ title: '', description: '', image: '', projectLink: '', category: '', technologies: [], tags: [], id: '' });
        setIsEditing(false);
        alert(`Project ${isEditing ? 'updated' : 'added'} successfully!`);
      } else {
        throw new Error("Operation failed.");
      }
    } catch (error) {
      console.error("Error saving project", error);
      alert("Failed to save project.");
    }
  };

  const editProject = (project) => {
    setFormData({ ...project, id: project._id });
    setIsEditing(true);
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`https://project-gallery-dqq8.onrender.com/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id));
        alert("Project deleted successfully!");
      } else {
        throw new Error("Delete failed.");
      }
    } catch (error) {
      console.error("Error deleting project", error);
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">{isEditing ? "Edit Project" : "Add a New Project"}</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <input type="text" name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <input type="text" name="projectLink" value={formData.projectLink} placeholder="Project Link" onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
        
        <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Select a category</option>
          {availableCategories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>

        <select multiple value={formData.technologies} onChange={(e) => handleMultiSelectChange(e, 'technologies')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          {availableTechnologies.map((tech) => <option key={tech._id} value={tech._id}>{tech.name}</option>)}
        </select>

        <select multiple value={formData.tags} onChange={(e) => handleMultiSelectChange(e, 'tags')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          {availableTags.map((tag) => <option key={tag._id} value={tag._id}>{tag.name}</option>)}
        </select>

        <button type="submit" className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-lg font-semibold">{project.title}</h4>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex items-center mt-3 space-x-4">
              <button onClick={() => editProject(project)} className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg hover:bg-yellow-500">Edit</button>
              <button onClick={() => deleteProject(project._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;