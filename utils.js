import { ITEMS } from './data';

export const getFilteredResults = (keyword) => {
    const result = ITEMS.filter((x) => {
        return x.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase();
    });

    return new Promise((res) => {
        setTimeout(() => {
            res(result);
        }, 500);
    });
};

export const debounce = (fn, delay=500) => {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}