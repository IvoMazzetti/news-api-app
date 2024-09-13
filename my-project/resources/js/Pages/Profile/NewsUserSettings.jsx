import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CategoryPreference from "@/Components/CategoryPreference.jsx";
import AuthorsPreference from "@/Components/AuthorsPreference.jsx";
import SourcesPreference from "@/Components/SourcesPreference.jsx";
import axios from 'axios';

export default function UpdateUserSettings({ categories, authors, sources, user_id, auth }) {
    const [selectedCategories, setSelectedCategories] = useState(categories?.selected || []);
    const [selectedAuthors, setSelectedAuthors] = useState(authors?.selected || []);
    const [selectedSources, setSelectedSources] = useState(sources?.selected || []);

    // Add or remove categories
    const handleCategorySelectionChange = (newCategories) => {
        setSelectedCategories(newCategories);
    };

    // Add or remove authors
    const handleAuthorSelectionChange = (newAuthors) => {
        setSelectedAuthors(newAuthors);
    };

    // Add or remove sources
    const handleSourceSelectionChange = (newSources) => {
        setSelectedSources(newSources);
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/save-preferences', {
                categories: selectedCategories,
                authors: selectedAuthors,
                sources: selectedSources,
                id: user_id,
            });

            // Handle successful response
            alert('Preferences saved successfully!');
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <section className="max-w-4xl mx-auto mt-10 p-6 bg-white  rounded-lg">
                <header className="flex justify-between border-b pb-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">News Settings</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Here you can customize your news settings preferences.
                        </p>
                    </div>
                </header>

                <form onSubmit={submit} className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                        {/* Pass dedicated handlers to each component */}
                        <CategoryPreference
                            categories={categories}
                            onSelectionChange={handleCategorySelectionChange}
                            onRemovalChange={handleCategorySelectionChange}
                        />
                        <AuthorsPreference
                            authors={authors}
                            onSelectionChange={handleAuthorSelectionChange}
                            onRemovalChange={handleAuthorSelectionChange}
                        />
                        <SourcesPreference
                            sources={sources}
                            onSelectionChange={handleSourceSelectionChange}
                            onRemovalChange={handleSourceSelectionChange}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Preferences
                        </button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
