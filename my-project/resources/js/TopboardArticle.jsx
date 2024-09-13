import {capitalizeFirstLetter} from './utils.js';

const TopboardArticle = ({article}) => (
    <div
        className="flex flex-col lg:flex-row my-[4rem] lg:my-[8rem] gap-4 lg:gap-8 items-start">
        {/* Image Section */}
        <a href={article.url}>
            <img
                className="w-full lg:w-[32rem] h-[18rem] lg:h-[18rem] rounded-2xl object-cover shadow-lg"
                alt={article.title || 'Placeholder'}
                src={article.url_to_image || 'https://via.placeholder.com/150'}
            />
        </a>

        {/* Content Section */}
        <div className="flex flex-col justify-between h-full w-full lg:w-auto">
            {/* Meta Information */}
            <div className="hidden md:block mb-4 text-gray-500 text-[1.3rem]">
                <span>{article.source_name || 'Source'}</span> | <span>{article.published_at ? new Date(article.published_at).toLocaleTimeString() : 'Time'}</span>
            </div>

            {/* Title and Description */}
            <div className="flex-1">
                <h1 className="text-[2rem] font-bold text-gray-900 leading-tight">
                    <a href={article.url}>{article.title || 'Title'}</a>
                </h1>
                <p className="hidden md:block mt-3 text-gray-700">
                    {article.description || 'No description available'}
                </p>
            </div>

            {/* Bottom Meta */}
            <div className="hidden md:block mt-6">
                <span className="text-[#FF2D20] font-bold">
                    {capitalizeFirstLetter(article.category)}
                </span> | <span>4 min read</span>
            </div>
        </div>
    </div>
);

export default TopboardArticle;
