const monthDate = [{
        month: 1,
        day: 31
    },
    {
        month: 2,
        day: 28
    },
    {
        month: 3,
        day: 31
    },
    {
        month: 4,
        day: 30
    },
    {
        month: 5,
        day: 31
    },
    {
        month: 6,
        day: 30
    },
    {
        month: 7,
        day: 31
    },
    {
        month: 8,
        day: 31
    },
    {
        month: 9,
        day: 30
    },
    {
        month: 10,
        day: 31
    },
    {
        month: 11,
        day: 30
    },
    {
        month: 12,
        day: 12
    },
]
export function useMonthData() {
    //获取当前月份
    let date = new Date()
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dataList = []
    let days = 0;
    if (IsRunNian()) {
        days = 29
    } else {
        days = 28
    }
    if (month === 2) {
        for (let i = 1; i <= days; i++) {
            let iValue = (i < 10) ? `0${i}` : i;
            let value = `${year}-0${month}-${iValue}`
            dataList.push(value)
        }
    } else {
        let item = monthDate.find(x => x.month === month)
        if (item !== null && item !== undefined) {
            let count = item.day
            for (let i = 1; i <= count; i++) {
                let iValue = (i < 10) ? `0${i}` : i;
                let imonth = (month < 10) ? `0${month}` : month
                let value = `${year}-${imonth}-${iValue}`
                dataList.push(value)
            }
        }
    }
    return dataList;

}
export function IsRunNian() {
    let year = new Date().getFullYear()
    let value = year % 4
    return value === 0 ? true : false
}
export function ShowMessage() {
    let hour = new Date().getHours();
    if (hour === 0) {
        return '夜深了，徐贵林，请注意休息！';
    } else if (hour > 0 && hour <= 5) {
        return '夜深了，徐贵林，请注意休息！';
    } else if (hour > 5 && hour < 8) {
        return '早上好，徐贵林，新的一天祝您工作顺利！';
    } else if (hour >= 8 && hour <= 12) {
        return '上午好，徐贵林，工作久了记得喝杯水！';
    } else if (hour > 12 && hour <= 18) {
        return '下午好，徐贵林，劳逸结合哦！';
    } else if (hour > 18 && hour <= 23) {
        return '晚上好，徐贵林，一天的工作结束了，请注意休息！'
    }
}