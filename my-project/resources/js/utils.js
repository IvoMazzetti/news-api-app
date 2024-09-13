export function capitalizeFirstLetter(str) {
    if (!str) return 'General';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
