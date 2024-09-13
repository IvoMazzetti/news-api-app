import React, { useState, useEffect } from "react";

const CategoryPreference = ({ categories, onSelectionChange, onRemovalChange }) => {
    const [initialCategories, setInitialCategories] = useState(categories.available);
    const [selectedCategories, setSelectedCategories] = useState(categories.selected);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const filtered = initialCategories.filter((category) =>
            !selectedCategories.some((selected) => selected[0] === category[0])
        );

        setFilteredCategories(filtered);
    }, [initialCategories, selectedCategories]);


    //Handle the add data
    const handleSelect = (item) => {
        const itemId = item[0];

        setSelectedCategories((prevSelected) => {
            const isAlreadySelected = prevSelected.some(([id]) => id === itemId);

            if (isAlreadySelected) {
                return prevSelected;
            }

            const newSelected = [...prevSelected, item];

            setFilteredCategories((prevInitial) =>
                prevInitial.filter(([id]) => id !== itemId)
            );

            onSelectionChange(newSelected); // Notify parent component of the add

            return newSelected;
        });
    };


    //Handle the remove data
    const handleRemove = (itemToRemove) => {
        const newSelected = selectedCategories.filter(([id]) => id !== itemToRemove[0]);
        setSelectedCategories(newSelected);
        if (!initialCategories.some(([id]) => id === itemToRemove[0])) {
            setInitialCategories([...initialCategories, itemToRemove]);
        }
        onRemovalChange(newSelected); // Notify parent component of the removal
    };

    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap items-center">
                {selectedCategories.map(([id, name]) => (
                    <div
                        key={id}
                        className="mt-4 bg-red-500 text-white px-3 text-[0.8rem] py-1 rounded-full m-1 flex items-center"
                    >
                        {name}
                        <a
                            onClick={() => handleRemove([id, name])}
                            className="cursor-pointer ml-2 bg-white rounded-full w-5 h-5 flex items-center justify-center text-black text-lg"
                        >
                            &times;
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {filteredCategories.map(([id, name]) => (
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

export default CategoryPreference;
