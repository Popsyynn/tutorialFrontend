import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tutorials, setTutorials] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    getAllTutorials();
  }, []);

  const getAllTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/tutorials');
      setTutorials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTutorialById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/tutorials/${id}`);
      setTutorials([response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const addTutorial = async () => {
    const tutorial = { title, description, published };

    try {
      await axios.post('http://localhost:8082/api/tutorials', tutorial);
      getAllTutorials();
      setTitle('');
      setDescription('');
      setPublished(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`http://localhost8082/api/tutorials/${id}`);
      getAllTutorials();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setPublished(checked);
    } else {
      if (name === 'title') {
        setTitle(value);
      } else if (name === 'description') {
        setDescription(value);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Tutorial App</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <h2>Add Tutorial</h2>
            <form onSubmit={addTutorial}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea id="description" name="description" value={description} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" id="published" name="published" checked={published} onChange={handleInputChange} className="form-check-input" />
                <label htmlFor="published" className="form-check-label">Published</label>
              </div>
              <button type="submit" className="btn btn-primary">Add Tutorial</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <h2>Tutorials</h2>
            {tutorials.length > 0 ? (
              <ul className="list-group">
                {tutorials.map((tutorial) => (
                  <li key={tutorial.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{tutorial.title}</h5>
                      <p>{tutorial.description}</p>
                      <p><strong>Published:</strong> {tutorial.published ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <button onClick={() => getTutorialById(tutorial.id)} className="btn btn-info">Edit</button>
                      <button onClick={() => deleteTutorial(tutorial.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tutorials found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
