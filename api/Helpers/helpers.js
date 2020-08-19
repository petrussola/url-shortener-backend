function randomStr(len, arr) {
    let ans = '';
    for (let i = len; i > 0; i--) {
        const test = arr[Math.floor(Math.random() * arr.length)];
        ans += test;
    }
    return ans;
}

module.exports = {
    randomStr,
};
