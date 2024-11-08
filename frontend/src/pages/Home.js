import React, { useState, useEffect } from 'react';

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://project-gallery-dqq8.onrender.com/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    
    return (
        <div>
            <h1 className='mt-5 text-2xl font-bold'>Ninad's Project Gallery</h1>
            
            <div className="grid grid-cols-3 gap-4 m-12">
                {projects.map((project) => (
                    <div key={project._id} className="p-4 border rounded-lg shadow-md">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-lg font-bold">{project.title}</h2>
                        <p className="text-gray-700">{project.description}</p>
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
                            View Project
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;