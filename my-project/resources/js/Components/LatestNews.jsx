import {capitalizeFirstLetter} from '../utils.js';

const LatestNews = ({latestNewsArticles}) => {

    return (
        <>

            {latestNewsArticles.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <p>No news articles found.</p>
                </div>
            ) : (
                latestNewsArticles.map((article) => {
                    if (!article.url || !article.title) return null;

                    return (
                        <div key={article.url} className="flex flex-col gap-6">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-full h-[12rem] rounded-lg object-cover cursor-pointer"
                                    src={article.url_to_image || 'https://via.placeholder.com/150'}
                                    alt={article.title}
                                />
                            </a>

                            <div className="flex flex-col justify-between flex-1">
                                <div>
                            <span className="text-gray-500">
                                {article.published_at
                                    ? new Date(article.published_at).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })
                                    : 'Unknown Date'}
                            </span>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        <h3 className="font-bold text-lg mt-1">{article.title}</h3>
                                    </a>
                                    <p className="text-gray-700 mt-6">
                                        {article.description || 'No description available'}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                            <span className="text-[#FF2D20] font-bold">
                                {capitalizeFirstLetter(article.category || 'Unknown')}
                            </span>
                                    <span className="text-gray-500">
                                {Math.floor(Math.random() * 10) + 1} min read
                            </span>
                                </div>
                            </div>
                        </div>
                    );
                }))
            };
        </>

    );
};

export default LatestNews;
