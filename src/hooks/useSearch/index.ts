import { useState } from 'react';

const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [year, setYear] = useState('');

    const handleSearch = (term: string, year: string) => {
        setSearchTerm(term);
        setYear(year);
    };
    return { searchTerm, year, handleSearch };
};

export default useSearch;
