export const textToSlug = (text: string) => {
    return text?.replaceAll(' ', '_').toLowerCase();
}

export function isExpired(expiryDate: string): boolean {
    const currentDateTime = new Date();
    const expiryDateTime = new Date(expiryDate);

    return currentDateTime >= expiryDateTime;
}