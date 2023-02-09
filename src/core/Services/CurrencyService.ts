const format = (value?: string | number) => {
    if (typeof value !== 'number' && !value) {
        return null;
    }
    
    const parsed = parseFloat(value as string); // Stupid Typescript is stupid.  parseFloat takes numbers, too.
    if (isNaN(parsed)) {
        return null;
    }
    return parsed.toFixed(2);
};


export const CurrencyService = {
    format
};
