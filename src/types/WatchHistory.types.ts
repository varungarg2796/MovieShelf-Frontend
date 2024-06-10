export interface ImdbInfoType {
    imdbid: string;
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: number;
    genre: string;
    director: string;
    writers: string;
    actors: string;
    plot: string;
    languages: string;
    country: string;
    awards: string;
    poster: string;
    metascore: number | null;
    imdbrating: string;
    imdbvotes: number;
    box_office: string;
    production: string;
}

export interface UserRatingType {
    user_rating_id: number;
    rating_value: number | null;
    review: string | null;
    recommended: boolean | null;
    tags: string | null;
}

export interface WatchHistoryType {
    watch_history_id: number;
    user_id: number;
    watch_date: string | null;
    feeling: string | null;
    watched_with: string | null;
    location: string | null;
    platform: string | null;
    rewatched: boolean | null;
    notes: string | null;
    userRating: UserRatingType;
    imdbid: ImdbInfoType;
}