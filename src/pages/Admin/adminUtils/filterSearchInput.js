export function filterData(data, searchInput) {
    if (!searchInput) return data; // Return original data if search input is empty

    const searchTerm = new RegExp(searchInput.trim(), 'i'); // Case-insensitive regex pattern

    return data.filter(item => {
        // Use regex to match name or slug with the search input
        return searchTerm.test(item.name) || searchTerm.test(item.slug);
    });
}


