import React, { useState, useEffect } from "react";

const AuthorsPreference = ({ authors, onSelectionChange, onRemovalChange }) => {
    const [initialAuthors, setInitialAuthors] = useState(authors?.available || []);
    const [selectedAuthors, setSelectedAuthors] = useState(authors?.selected || []);
    const [filteredAuthors, setFilteredAuthors] = useState([]);

    // Filter authors on mount or when initialAuthors or selectedAuthors change
    useEffect(() => {
        const filtered = initialAuthors.filter(
            (author) => !selectedAuthors.some(([id]) => id === author[0])
        );
        setFilteredAuthors(filtered);
    }, [initialAuthors, selectedAuthors]);

    const handleSelect = (item) => {
        const itemId = item[0];

        // Update selectedAuthors using functional updates
        setSelectedAuthors((prevSelected) => {
            if (prevSelected.some(([id]) => id === itemId)) {
                return prevSelected;
            }

            const newSelected = [...prevSelected, item];
            setFilteredAuthors((prevInitial) => prevInitial.filter(([id]) => id !== itemId));
            onSelectionChange(newSelected);

            return newSelected;
        });
    };

    const handleRemove = (itemToRemove) => {
        const itemId = itemToRemove[0];

        // Update selectedAuthors using functional updates
        setSelectedAuthors((prevSelected) => {
            const newSelected = prevSelected.filter(([id]) => id !== itemId);

            // Update filteredAuthors to include the removed item
            setFilteredAuthors((prevFiltered) => [...prevFiltered, itemToRemove]);
            onRemovalChange(newSelected); // Notify parent after removal

            return newSelected;
        });
    };

    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Authors</h2>
            <div className="flex flex-wrap items-center">
                {selectedAuthors.map(([id, name]) => (
                    <div
                        key={id}
                        className="mt-4 bg-red-500 text-white px-3 text-[0.8rem] py-1 rounded-full m-1 flex items-center"
                    >
                        {name}
                        <a
                            onClick={() => handleRemove([id, name])} // Handle author removal
                            className="cursor-pointer ml-2 bg-white rounded-full w-5 h-5 flex items-center justify-center text-black text-lg"
                        >
                            &times;
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {filteredAuthors.slice(0, 10).map(([id, name]) => (
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

export default AuthorsPreference;
