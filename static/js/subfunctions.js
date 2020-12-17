const subfunctions = {
    generateRandomNum(max) {
        return Math.floor(Math.random() * Math.floor(max)) //return a random number limited to the amount of events
    },
    compareDay(a, b) {
        //compare values so it can be sorted, such as an array of numbers
        let first = a.dayNum
        let second = b.dayNum

        let comp = 0; //comparison

        if (first > second) {
            comp = 1;
        } else if (first < second) {
            comp = -1;
        }
        return comp;
    },
    convertTime(miliseconds) {
        let month, day = "";
        let date = new Date(miliseconds);
        month = date.getMonth() + 1;
        day = date.getDate();

        month = month < 10 ? ('0' + month) : month;
        day = day < 10 ? ('0' + day) : day;

        return `${day} / ${month}`
    }
}