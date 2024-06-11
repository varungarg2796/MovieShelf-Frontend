import React, { useState } from 'react';
import 'daisyui/dist/full.css';
import type { WatchHistoryType } from '../types/WatchHistory.types';
import Cookies from 'js-cookie';

interface WatchHistoryRatingProps {
    watchHistory: WatchHistoryType;
    refresh: () => void; 
    closeModal: () => void;
}

const WatchHistoryRating: React.FC<WatchHistoryRatingProps> = (props) => {
    const [watchHistory, setWatchHistory] = useState<WatchHistoryType>(props.watchHistory);
    const accessToken = Cookies.get('access_token');
    const [remainingCharsNotes, setRemainingCharsNotes] = useState(200);
    const [remainingCharsReview, setRemainingCharsReview] = useState(1000);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        if (e.target.name === 'notes') {
            setRemainingCharsNotes(200 - e.target.value.length);
        }
        if (e.target.name === 'userRating.review') {
            setRemainingCharsReview(1000 - e.target.value.length);
        }
        if (type === 'checkbox') {
            setWatchHistory(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            const keys = name.split('.');
            if (keys.length > 1) {
                setWatchHistory((prevState: any) => ({
                    ...prevState,
                    [keys[0]]: {
                        ...prevState[keys[0]],
                        [keys[1]]: value
                    }
                }));
            } else {
                setWatchHistory(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { imdbid, watch_date, feeling, watched_with, location, platform, rewatched, notes, userRating } = watchHistory;

        const watchHistoryData = {
            imdbid: imdbid.imdbid,
            watch_date,
            feeling,
            watched_with,
            location,
            platform,
            rewatched,
            notes
        };

        const userRatingData = {
            rating_value: userRating.rating_value,
            review: userRating.review,
            recommended: userRating.recommended,
            tags: userRating.tags
        };

        const requestData = { watchHistoryData, userRatingData };

        try {
            const response = await fetch(`http://localhost:3000/watch-history/${watchHistory.watch_history_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert('Watch history updated successfully!');
                props.closeModal();
                props.refresh();
            } else {
                alert('Failed to update watch history.');
            }
        } catch (error) {
            console.error('Error updating watch history:', error);
            alert('An error occurred while updating watch history.');
        }
    };

    return (
        <div onClick={props.closeModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div onClick={(e) => e.stopPropagation()} className="card w-full max-w-lg bg-base-100 shadow-xl relative p-4 max-h-full overflow-auto">
                <button onClick={props.closeModal} className="btn btn-square absolute top-0 right-0 m-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <form onSubmit={handleSubmit} className="form-control space-y-4">
                    <label className="label mt-2">
                        <span className="label-text">Watch Date</span>
                    </label>
                    <input
                        type="date"
                        name="watch_date"
                        value={watchHistory.watch_date ? new Date(watchHistory.watch_date).toISOString().split('T')[0] : ''}
                        max={new Date().toISOString().split("T")[0]} // Set max to today's date
                        onChange={handleChange}
                        className="input input-bordered"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Feeling</span>
                    </label>
                    <input
                        type="text"
                        name="feeling"
                        value={watchHistory.feeling || ''}
                        onChange={handleChange}
                        className="input input-bordered"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Watched With</span>
                    </label>
                    <input
                        type="text"
                        name="watched_with"
                        value={watchHistory.watched_with || ''}
                        onChange={handleChange}
                        className="input input-bordered"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={watchHistory.location || ''}
                        onChange={handleChange}
                        className="input input-bordered"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Platform</span>
                    </label>
                    <input
                        type="text"
                        name="platform"
                        value={watchHistory.platform || ''}
                        onChange={handleChange}
                        className="input input-bordered"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Rewatched</span>
                    </label>
                    <input
                        type="checkbox"
                        name="rewatched"
                        checked={watchHistory.rewatched || false}
                        onChange={handleChange}
                        className="checkbox"
                    />

                    <label className="label mt-2">
                        <span className="label-text">Notes ({remainingCharsNotes} chars left)</span>
                    </label>
                    <textarea
                        name="notes"
                        value={watchHistory.notes || ''}
                        onChange={handleChange}
                        maxLength={200}
                        className="textarea textarea-bordered"
                    ></textarea>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-semibold">Your Rating</h3>
                        <label className="label mt-2">
                            <span className="label-text">Rating</span>
                        </label>
                        <input
                            type="number"
                            name="userRating.rating_value"
                            value={watchHistory.userRating.rating_value || ''}
                            onChange={handleChange}
                            max= {5}
                            min = {1}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">Review ({remainingCharsReview} chars lef)</span>
                        </label>
                        <textarea
                            name="userRating.review"
                            value={watchHistory.userRating.review || ''}
                            onChange={handleChange}
                            maxLength={1000}
                            className="textarea textarea-bordered"
                        ></textarea>

                        <label className="label mt-2">
                            <span className="label-text">Tags</span>
                        </label>
                        <input
                            type="text"
                            name="userRating.tags"
                            value={watchHistory.userRating.tags || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WatchHistoryRating;
