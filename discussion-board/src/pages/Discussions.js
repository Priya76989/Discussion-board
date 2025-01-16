import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [counts, setCounts] = useState({});
    const [userSelections, setUserSelections] = useState({});

    // Load discussions, likes/dislikes from localStorage
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        const storedCounts = JSON.parse(localStorage.getItem('counts')) || {};
        const storedSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
        setCounts(storedCounts);
        setUserSelections(storedSelections);
    }, []);

    // Handle Like or Dislike action
    const handleSelection = (id, selection) => {
        const previousSelection = userSelections[id];
        let updatedCount = counts[id] || 0;

        if (selection === 'like') {
            if (previousSelection === 'like') {
                updatedCount -= 1; // Remove Like
                userSelections[id] = null;
            } else {
                updatedCount += 1; // Add Like
                if (previousSelection === 'dislike') {
                    updatedCount += 1; // Remove Dislike (add 1)
                }
                userSelections[id] = 'like'; // Set current reaction to Like
            }
        } else if (selection === 'dislike') {
            if (previousSelection === 'dislike') {
                updatedCount += 1; // Remove Dislike (add 1)
                userSelections[id] = null;
            } else {
                updatedCount -= 1; // Add Dislike (subtract 1)
                if (previousSelection === 'like') {
                    updatedCount -= 1; // Remove Like (subtract 1)
                }
                userSelections[id] = 'dislike'; // Set current reaction to Dislike
            }
        }

        const updatedCounts = { ...counts, [id]: updatedCount };
        const updatedSelections = { ...userSelections, [id]: userSelections[id] };

        setCounts(updatedCounts);
        setUserSelections(updatedSelections);

        localStorage.setItem('counts', JSON.stringify(updatedCounts));
        localStorage.setItem('userSelections', JSON.stringify(updatedSelections));
    };

    const styles = {
        container: {
            maxWidth: '900px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            backgroundColor: '#fafafa',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
            fontSize: '32px',
            fontWeight: '700',
        },
        link: {
            display: 'inline-block',
            marginBottom: '20px',
            padding: '12px 25px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#007bff',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
        },
        linkHover: {
            backgroundColor: '#0056b3',
        },
        list: {
            listStyle: 'none',
            padding: '0',
        },
        listItem: {
            marginBottom: '25px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
        },
        content: {
            fontSize: '16px',
            color: '#555',
            marginBottom: '20px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            marginTop: '20px',
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#f4f4f4',
            transition: 'background-color 0.3s ease',
        },
        likeButton: {
            backgroundColor: '#006aff',
            color: '#fff',
        },
        dislikeButton: {
            backgroundColor: '#ff3b30',
            color: '#fff',
        },
        buttonHover: {
            backgroundColor: '#3b79d2',
        },
        countDisplay: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#333',
        },
        activeButton: {
            backgroundColor: '#333',
            color: '#fff',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Discussions</h1>
            <Link
                to="/new-discussion"
                style={styles.link}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
            >
                Post a New Discussion
            </Link>
            <ul style={styles.list}>
                {discussions.map((discussion) => (
                    <li key={discussion.id} style={styles.listItem}>
                        <h2 style={styles.title}>{discussion.title}</h2>
                        <p style={styles.content}>{discussion.content}</p>
                        <div style={styles.buttonContainer}>
                            <button
                                style={{
                                    ...styles.button,
                                    ...styles.likeButton,
                                    ...(userSelections[discussion.id] === 'like' ? styles.activeButton : {}),
                                }}
                                onClick={() => handleSelection(discussion.id, 'like')}
                            >
                                👍 Like
                            </button>
                            <span style={styles.countDisplay}>{counts[discussion.id] || 0}</span>
                            <button
                                style={{
                                    ...styles.button,
                                    ...styles.dislikeButton,
                                    ...(userSelections[discussion.id] === 'dislike' ? styles.activeButton : {}),
                                }}
                                onClick={() => handleSelection(discussion.id, 'dislike')}
                            >
                                👎 Dislike
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;
