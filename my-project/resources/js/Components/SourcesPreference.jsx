import React, { useState, useEffect } from "react";

const SourcesPreference = ({ sources, onSelectionChange, onRemovalChange }) => {
    const [initialSources, setInitialSources] = useState(sources?.available || []);
    const [selectedSources, setSelectedSources] = useState(sources?.selected || []);
    const [availableSources, setAvailableSources] = useState([]);
    const [sourceSearch, setSourceSearch] = useState('');

    useEffect(() => {
        if (Array.isArray(initialSources)) {
            const filteredSources = initialSources.filter(([id]) =>
                !selectedSources.some(([selectedId]) => selectedId === id)
            );
            setAvailableSources(filteredSources);
        }


    }, [initialSources, selectedSources]);

    const handleSelect = (item) => {
        if (!selectedSources.some(([id]) => id === item[0])) {
            const newSelected = [...selectedSources, item];
            setSelectedSources(newSelected);
            setAvailableSources(availableSources.filter(([id]) => id !== item[0]));

            onSelectionChange(newSelected);
        }
    };

    // Handle removing a source
    const handleRemove = (itemToRemove) => {
        const newSelected = selectedSources.filter(([id]) => id !== itemToRemove[0]);
        setSelectedSources(newSelected);
        if (!availableSources.some(([id]) => id === itemToRemove[0])) {
            setAvailableSources([...availableSources, itemToRemove]);
        }
        onRemovalChange(newSelected);
    };

    // Filter sources based on the search input
    const filteredSources = availableSources.filter(([_, name]) =>
        typeof name === 'string' && name.toLowerCase().includes(sourceSearch.toLowerCase())
    );

    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Sources</h2>
            <input
                type="text"
                placeholder="Search sources..."
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <div className="flex flex-wrap items-center">
                {selectedSources.map(([id, name]) => (
                    <div
                        key={id}
                        className="mt-4 bg-red-500 text-white px-3 text-[0.8rem] py-1 rounded-full m-1 flex items-center"
                    >
                        {name}
                        <a
                            onClick={() => handleRemove([id, name])} // Handle removal
                            className="ml-2 cursor-pointer bg-white rounded-full w-5 h-5 flex items-center justify-center text-black text-lg"
                        >
                            &times;
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {filteredSources.slice(0, 5).map(([id, name]) => (
                    <a
                        key={id}
                        onClick={() => handleSelect([id, name])}
                        className="cursor-pointer bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300"
                    >
                        {name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SourcesPreference;
