export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        const context = this;
        timeout = setTimeout(() => {
            func.apply(context, [...args]);
        }, wait);
    };
};
