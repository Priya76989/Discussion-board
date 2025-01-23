import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Discussions = () => {
    // States to handle user interaction
    const [discussions, setDiscussions] = useState([]);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // To check if there are any discussions stored in localStorage
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        const storedDislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
        setLikes(storedLikes);
        setDislikes(storedDislikes);
    }, []);

    // Handle like event
    const handleLike = (id) => {
        const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike event
    const handleDislike = (id) => {
        const updatedDislikes = { ...dislikes, [id]: (dislikes[id] || 0) + 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };

    return (
        <div className="container mt-5 p-4 bg-light shadow rounded">
            <h1 className="text-center text-primary mb-4">Discussions</h1>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/new-discussion" className="btn btn-primary">
                    Post a New Discussion
                </Link>
            </div>
            <ul className="list-group">
                {discussions.map((discussion) => {
                    const likeCount = likes[discussion.id] || 0;
                    const dislikeCount = dislikes[discussion.id] || 0;
                    const totalCount = likeCount - dislikeCount;
                    return (
                        <li key={discussion.id} className="list-group-item mb-3">
                            <div>
                                <h5 className="fw-bold text-dark">{discussion.title}</h5>
                                <p className="text-danger">{discussion.content}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => handleLike(discussion.id)}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=100&id=YbNGe7fKEaZV&format=png&color=000000"
                                        alt="Like"
                                        className="img-fluid"
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                </button>
                                <span className="badge bg-secondary me-2">{totalCount}</span>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDislike(discussion.id)}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=100&id=HdNFOrnNuBoG&format=png&color=000000"
                                        alt="Dislike"
                                        className="img-fluid"
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Discussions;
