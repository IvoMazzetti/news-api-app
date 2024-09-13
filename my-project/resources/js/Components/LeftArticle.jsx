import {capitalizeFirstLetter} from '../utils.js';

const LeftArticle = ({article}) => {

    return (
        <>
            <a href={article.url}>
                <img
                    className="w-full h-[12rem] rounded-lg object-cover"
                    src={article.url_to_image || 'https://via.placeholder.com/150'}
                    alt={article.title}
                />
            </a>
            <div className="flex flex-col flex-1">
            <span className="text-gray-500">
                {new Date(article.published_at).toLocaleDateString('en-US', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                    </span>
                <a href={article.url}>
                    <h3 className="font-bold text-lg mt-1">{article.title}</h3>
                </a>
                <p className="text-gray-700 mt-6">
                    {article.description || 'No description available'}
                </p>
                {/* Bottom Meta */}
                <div className="hidden md:block mt-6">
                        <span className="text-[#FF2D20] font-bold">
                            {capitalizeFirstLetter(article.category)}
                        </span> | <span>4 min read</span>
                </div>
            </div>
        </>
    );
};

export default LeftArticle;
