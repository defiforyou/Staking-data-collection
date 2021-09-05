function retryFunction(numretries) {
    const retries = numretries || 1;
    let retry = 0;
    return async function(fn, ...args) {
        while(retry<retries) {
            try {
                return fn.apply(fn, args)
            } catch (e) {
                console.log('Retrying function');
                retry = retry +1;
            }
        }
    }
}

module.exports.retry = retryFunction;
