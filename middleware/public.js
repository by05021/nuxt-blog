export const getTime = (time) => {
    const date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    return (Y + M + D)
};

const getUnix = () => {
    const date = new Date();
    return date.getTime();
};

const getTodayUnix = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

const getLastDate = (time) => {
    const date = new Date(time);
    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day;
};

export const getFormatTime = (timestamp) => {
    const now = getUnix(); // 当前时间戳
    const today = getTodayUnix(); // 今天0点的时间戳
    const timer = (now - timestamp) / 1000; // 转换为秒级时间戳
    let tip = '';

    if (timer <= 0) {
        tip = "刚刚";
    } else if (Math.floor(timer / 60) <= 0) {
        tip = "刚刚";
    } else if (timer < 3600) {
        tip = Math.floor(timer / 60) + "分钟前";
    } else if (timer >= 3600 && timestamp - today >= 0) {
        tip = Math.floor(timer / 3600) + "小时前";
    } else if (timer / 86400 <= 31) {
        tip = Math.ceil(timer / 86400) + "天前";
    } else {
        tip = getLastDate(timestamp);
    }
    return tip;
};

export const getrand = (m, n) => {
    return Math.floor(Math.random() * (n - m + 1)) + m;
};

export const scrollAnimation = (currentY, targetY) => {
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY);
        } else {
            window.scrollTo(_currentY, targetY);
        }
    }, 1);
}