import {capitalizeFirstLetter} from '../utils.js';

const CenterArticle = ({article}) => {

    return (
        <>
            <a href={article.url}>
                <img
                    className="w-full h-full rounded-lg object-cover"
                    src={article.url_to_image || 'https://via.placeholder.com/150'}
                    alt={article.title}
                />
            </a>
            <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                                                <span className="block text-gray-300 text-sm">
                                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                <a href={article.url}>
                    <h3 className="font-bold text-lg mt-1">{article.title}</h3>
                </a>
                <p className="text-gray-200 mt-2">
                    {article.description || 'No description available'}
                </p>
            </div>
        </>
    );
};

export default CenterArticle;
