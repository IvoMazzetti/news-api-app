import React from 'react';

const RightSideBar = ({ filters, setFilters, onFilterSubmit }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-4">Filter News</h1>
            <form onSubmit={onFilterSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="q"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Keyword
                    </label>
                    <input
                        type="text"
                        id="q"
                        name="q"
                        value={filters.q}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>

                <div>
                    <label
                        htmlFor="startDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="endDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">All</option>
                        <option value="business">Business</option>
                        <option value="technology">Technology</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="source"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Source
                    </label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        value={filters.source}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g., BBC News"
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Filter
                </button>
            </form>
        </div>
    );
};

export default RightSideBar;
