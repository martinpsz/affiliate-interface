export const debounce = (func:Function, wait:number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: [Number|String]) => {
        clearTimeout(timeout);
        const context = this;

        timeout = setTimeout(() => {
            func.apply(context, [...args])
        }, wait)
    }
}