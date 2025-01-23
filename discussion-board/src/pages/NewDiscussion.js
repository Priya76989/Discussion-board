import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDiscussion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];

        const newDiscussion = {
            id: Date.now(),
            title,
            content,
        };

        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        navigate('/discussions');
    };

    return (
        <div className="container mt-16 p-14 bg-red shadow rounded">
            <h1 className="text-center text-primary mb-4">Post a New Discussion</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold text-secondary">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Enter discussion title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold text-secondary">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Enter discussion content"
                        rows="5"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100 text-uppercase fw-bold bg-black "
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
