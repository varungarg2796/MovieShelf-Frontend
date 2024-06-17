import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">About Movie Shelf</h1>
                <p className="text-lg mb-4">
                    Welcome to Movie Shelf, your personalized movie tracking app designed to enhance your movie-watching experience.
                    Our app allows you to track the movies you've watched, create watchlists for future viewing, and optionally record
                    details about your experiences, including who you watched with, where you watched it, and how you felt about the movie.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Features</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Search for movies by title</li>
                    <li>Add movies to your watchlist for future viewing.</li>
                    <li>Mark movies as watched and log the date you watched them.</li>
                    <li>Record details about your viewing experience, including feelings, companions, and location.</li>
                    <li>Rate and review movies you've watched (optional features).</li>
                    <li>View detailed information about movies, including plot summaries, cast, and more.</li>
                    <li>Receive recommendations for new movies to watch (future implementation).</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-2">System Architecture</h2>
                <p className="text-lg mb-4">
                    Movie Shelf utilizes a three-tier architecture consisting of:
                </p>
                <ol className="list-decimal list-inside mb-4">
                    <li>
                        <strong>Frontend:</strong> The user interface built with a JavaScript framework - React.
                    </li>
                    <li>
                        <strong>Backend:</strong> The server-side logic built using a Node.js framework - NestJS.
                    </li>
                    <li>
                        <strong>Database:</strong> The storage system for all application data, likely using Postgres.
                    </li>
                </ol>
                <h2 className="text-2xl font-semibold mb-2">Future Enhancements</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Implementing social features like user profiles and following other users.</li>
                    <li>Integrating with social media platforms for recommendations based on friends' activities.</li>
                    <li>Advanced recommendation algorithms based on watch history and collaborative filtering.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;
