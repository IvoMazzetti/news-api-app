import {Link, Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import axios from 'axios';
import TopboardArticle from "@/TopboardArticle.jsx";
import LatestNews from "@/Components/LatestNews.jsx";
import LeftArticle from "@/Components/LeftArticle.jsx";
import CenterArticle from "@/Components/CenterArticle.jsx";
import RightArticle from "@/Components/RightArticle.jsx";
import NavLink from "@/Components/NavLink.jsx";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('api/articles/top-headlines', {
                    params: {
                        pageSize: 8,
                    }
                });


                if (Array.isArray(response.data.articles.data)) {
                    setArticles(response.data.articles.data);
                } else {
                    // Handle unexpected response structure
                    console.error('Unexpected response structure', response.data);
                    setArticles([]);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching articles: {error.message}</p>;

    // Ensure there are enough articles to display
    const topboardArticle = articles[0];
    const remainingArticles = articles.slice(1);
    const latestNewsArticles = remainingArticles.slice(0, 4);
    const mustReadArticles = remainingArticles.slice(4, 8);

    return (
        <>
            <Head title="Welcome"/>
            <div className="bg-gray-50 dark:bg-black dark:text-white/50">
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex justify-between items-center py-6 px-4">
                            <div className="flex items-center space-x-4">
                                <nav className="flex space-x-4">
                                    {/* Home link always available */}
                                    <NavLink href={route('welcome')} active={route().current('welcome')}>
                                        Home
                                    </NavLink>

                                    {auth?.user && (
                                        <>
                                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                                Latest News
                                            </NavLink>
                                            <NavLink href={route('settings')} active={route().current('settings')}>
                                                Customize Settings
                                            </NavLink>
                                        </>
                                    )}
                                </nav>
                            </div>

                            {!auth?.user ? (
                                <div>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 bg-[#FF2D20] text-white rounded-md"
                                    >
                                        Log In
                                    </Link>
                                </div>
                            ) : null}
                        </header>


                        <main className="flex items-center flex-col justify-center">
                            <div className="mt-10 text-center max-w-3xl px-4">
                                <p className="text-2xl font-playfair font-bold text-gray-700 tracking-[0.4rem]">Welcome
                                    to Buletin</p>
                                <h1 className="hidden md:block text-[1.75rem] md:text-[2.5rem] font-black mt-2 leading-tight">
                                    Craft narratives that ignite
                                    <span className="text-red-500"> inspiration</span>
                                    <br/>
                                    <span className="text-red-500">knowledge</span> and
                                    <span className="ml-2 text-red-500">entertainment</span>
                                </h1>

                            </div>

                            {/* Topboard Article Section */}
                            {topboardArticle && (
                                <TopboardArticle article={topboardArticle}/>
                            )}


                            <div className="w-full">
                                {/* Header Section */}
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="font-bold text-[2rem]">Latest News</h2>
                                    <span className="text-[#FF2D20] font-bold text-xl cursor-pointer">
                                        See all &rarr;
                                    </span>
                                </div>

                                {/* Article Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <LatestNews latestNewsArticles={latestNewsArticles}/>
                                </div>


                            </div>

                            <div className="my-8">
                                <h2 className="text-2xl font-bold mb-6">Must Read</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                                    {/* Left article */}
                                    <div className='lg:col-span-1 flex flex-col gap-6'>
                                        <LeftArticle article={mustReadArticles[0]}/>
                                    </div>

                                    {/* Center article */}
                                    <div className="lg:col-span-2 relative flex flex-col">
                                        <CenterArticle article={mustReadArticles[1]}/>
                                    </div>


                                    {/* Right articles */}
                                    <div className="lg:col-span-1 flex flex-col gap-6">
                                        {mustReadArticles[2] && <RightArticle article={mustReadArticles[2]}/>}
                                    </div>

                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
