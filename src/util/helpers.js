module.exports.retry = (numretries) => {
    return async function(fn, ...args) {
        let retry = 0;
        while(retry < numretries) {
            try {
                const result = await fn.apply(fn, args)
                return result;
            } catch (e) {
                console.log(retry+1 +':: Retrying function::' +e.message) ;
                retry = retry +1;
                if(retry >= numretries) {
                    console.log("OUT OF RETRIES for: " + fn.name)
                    return;
                }
            }
        }

    }
}
