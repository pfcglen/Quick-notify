;('use strict')

// Import modules
import { setAlarmTime } from './alarm-success.js'
import { disabledUserInput } from './disabled-element.js'
import { setAlarm } from './set-alarm.js'
import { clearAlarm, closeWindow } from './clear-alarm.js'

// * At first check input tag if alarm already set if so disable it
chrome.browserAction.getBadgeText({}, function(isActive) {
	if (isActive == 'On') {
		disabledUserInput()
		chrome.storage.sync.get(['minutes', 'message'], function(item) {
			setAlarmTime(item.minutes, item.message)
		})
	}
})

// * Clear alarm setting or fired when an alarm has elapsed
chrome.alarms.onAlarm.addListener(function(alarms) {
	chrome.browserAction.setBadgeText({ text: '' })
	clearAlarm()
	closeWindow()
})

// * Events
document
	.querySelector('#closeBtn')
	.addEventListener('click', closeWindow, false)
document.querySelector('#alarmOn').addEventListener('click', setAlarm, false)
document.querySelector('#alarmOff').addEventListener('click', clearAlarm, false)
