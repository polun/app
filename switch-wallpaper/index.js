const wallpaper = require('wallpaper')
const schedule = require('node-schedule')
const path = require('path')
const os = require('os')
const fs = require('fs')

const LOG_FILE = 'info.log'
const LOG_FILE_MAXSIZE = 10485760

function execution() {
    if (fs.statSync(LOG_FILE).size > LOG_FILE_MAXSIZE) {
        fs.unlinkSync(LOG_FILE)
    }

    getImg().then((newImg) => {
        wallpaper.get().then((currentWallPaper) => {
            if (path.basename(newImg) !== path.basename(currentWallPaper)) {
                wallpaper.set(newImg).then(() => {
                    log(`switch succed!`)
                })
            } else {
                log('image not changed')
            }
        })
    }).catch((err) => {
        log(err.message)
    })
}

function getImg() {
    return new Promise((resolve, reject) => {
        resolve('1.jpg')
    })
}

function log(msg) {
    fs.appendFileSync('info.log', `[${new Date()}] ${msg} ${os.EOL}`)
}

const rule = new schedule.RecurrenceRule()
rule.minute = 10

const job = schedule.scheduleJob(rule, execution);