let timer = null

checkPermission()
function checkPermission() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    checkTime()
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        checkTime()
      }
    });
  }
}

function checkTime() {
  if (!timer) clearTimeout(timer)
  timer = setTimeout(() => {
    const dateTime = new Date().toLocaleString('zh', { timeZone: 'UTC' })
    const time = dateTime.split(' ')[1]
    let notification = dispatchNotification(time)
    return checkTime()
  }, 1000);
}

/**
 * 获取notification-action
 * @param {String} time 时间UTC HH:mm:ss
 * @returns {String}
 */
function dispatchNotification(time) {
  switch (true) {
    case isLunchTime(time):
      return new Notification('午饭时间！', {
        icon: '/icons/clock.png',
        body: '午饭时间到了！赶紧出发！您的小伙伴正在楼下等您！'
      })
    case isDrinkWaterTime(time):
      return new Notification('喝水时间！', {
        icon: '/icons/clock.png',
        body: '喝水时间！已经工作一个小时了，不如起来活动一下吧！'
      })
    case isBackToHomeTime(time):
      return new Notification('回家时间！', {
        icon: '/icons/clock.png',
        body: '到点了到点了到点了！还有十五分钟，别忘记打卡！'
      })
    default:
      return ''
  }
}

/**
 * 喝水时间
 * @param {String} str 时间UTC HH:mm:ss
 * @returns {Boolean}
 */
function isDrinkWaterTime(str) {
  const timeRegexp = new RegExp(/^0[1-9]:00:00/)
  return timeRegexp.test(str)
}

/**
 * 午饭时间
 * @param {String} str 时间UTC HH:mm:ss
 * @returns {Boolean}
 */
function isLunchTime(str) {
  return str === '03:40:00'
}

/**
 * 回家时间
 * @param {String} str 时间UTC HH:mm:ss
 * @returns {Boolean}
 */
function isBackToHomeTime(str) {
  return str === '09:00:00'
}
