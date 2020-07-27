function randomStr(len, arr) {
    console.log(arr, '<<< this is the array');
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
