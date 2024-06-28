import { useState } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from '../constants';

interface Movie {
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
    imdbID: string;
}

const useFetchData = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchYear, setSearchYear] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchMovies = async (page: number = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                apikey: API_KEY,
                s: searchQuery,
                y: searchYear,
                page: page.toString(),
            };

            const response = await axios.get(API_URL, { params });
            if (response.data.Response === 'True') {
                const totalResults = parseInt(response.data.totalResults);
                setMovies(response.data.Search || []);
                setTotalPages(Math.ceil(totalResults / 10));
            } else {
                setError(response.data.Error || 'Movie not found!');
                setMovies([]);
                setTotalPages(0);
            }
        } catch (error) {
            setError('Error fetching data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        searchYear,
        setSearchYear,
        isLoading,
        error,
        movies,
        fetchMovies,
        totalPages,
    };
};

export default useFetchData;
