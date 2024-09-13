import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import LatestNews from "@/Components/LatestNews.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import RightSideBar from "@/Components/RightSideBar.jsx";

export default function Dashboard({id, auth}) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        q: '',
        source: '',
        category: '',
        startDate: '',
        endDate: '',
        page: 1,
        userId: id,
    });

    // Reusable function to fetch articles
    const fetchArticles = async (filterParams = {}) => {
        setLoading(true);
        try {
            const response = await axios.get('api/articles/top-headlines', {
                params: {...filters, ...filterParams}
            });


            if (Array.isArray(response.data.articles.data)) {
                setArticles(response.data.articles.data);
            } else {
                console.error('Unexpected response structure', response.data);
                setArticles([]);

            }
        } catch (err) {
            throw (err);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        fetchArticles();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard"/>

            <div className="my-10 bg-white dark:bg-black dark:text-white/50">
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="flex items-center flex-col justify-center">
                            <div className="w-full">
                                {/* Header Section */}
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="font-bold text-[2rem]">Latest News</h2>
                                </div>

                                {/* Article Section */}
                                <div className="flex flex-col lg:flex-row gap-8 px-4">
                                    {/* Articles Section */}
                                    <div className="w-full lg:w-3/4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <LatestNews latestNewsArticles={articles}/>
                                        </div>
                                    </div>

                                    {/* Filter Section */}
                                    <div
                                        className="w-full lg:w-1/4 h-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md sticky top-0 z-10">
                                        <RightSideBar
                                            filters={filters}
                                            setFilters={setFilters}
                                            onFilterSubmit={handleFilterSubmit}
                                        />
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
