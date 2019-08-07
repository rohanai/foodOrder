const debounce = (fn, d) => {
    let timer;
    return function() {
        let context = this,
        arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, arg);
        }, d);
    };
};

export default debounce;