const getTime = () => {
    const now = new Date()
    var mon = parseInt(now.getMonth()+1).toString()
    var timeList = []
    timeList.push(now.getMonth()+1)
    timeList.push(now.getDate())
    timeList.push(now.getHours())
    timeList.push(now.getMinutes())
    timeList.push(now.getSeconds())
    for (let i=0; i<5; i++) {
        if (timeList[i] < 10) {
            timeList[i] = '0' + timeList[i].toString()
        } else {
            timeList[i] =  timeList[i].toString()
        }
    }
    return now.getFullYear().toString() + '-' + timeList[0] + '-' + timeList[1] + '-' + timeList[2] + '-' + timeList[3] + '-' + timeList[4]
}

export default getTime