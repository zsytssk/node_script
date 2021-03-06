function formatDuring(mss) {
    let result = '';
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    if (days) {
        result += days + "d ";
    }
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours) {
        result += hours + "h ";
    }
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes) {
        result += minutes + "m ";
    }
    let seconds = (mss % (1000 * 60)) / 1000;
    if (seconds) {
        result += seconds + "s ";
    }
    if (!result) {
        result = '0s'
    }
    return result;
}

module.exports = formatDuring;