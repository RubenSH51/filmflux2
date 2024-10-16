import React, { useState, useEffect } from 'react';

export const useFetch = (apiPath, query = "", genres = "", page = "1") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const url_base = 'https://api.themoviedb.org/3';
    const API_KEY = '8df32093a2bc91dd41568c23ba71135a';

    // Si query está vacío, no lo incluimos en la URL
    const url = query
        ? `${url_base}/${apiPath}?api_key=${API_KEY}&query=${query}&sort_by=popularity.desc&page=${page}`
        : `${url_base}/${apiPath}?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                // Verificamos que 'results' exista en la respuesta
                if (json.results) {
                    setData(json.results);
                } else {
                    setData([]);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [url]);

    return { data, loading, error };
};