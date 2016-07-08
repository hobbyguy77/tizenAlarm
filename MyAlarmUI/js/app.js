/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/

(function() {
	/**
	 * Event handler for tizenhwkey Terminates the 'alarm' application when the
	 * tizenhwkey event triggered and triggered key was a back key.
	 * 
	 * @param {Object}
	 *            event - tizenhwkey event object
	 */
	function keyEventHandler(event) {
		if (event.keyName === "back") {
			var page = document.getElementsByClassName('ui-page-active')[0], pageid;

			pageid = page ? page.id : "";

			if (pageid === "main-page") {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				tau.changePage("#main-page");
			}
		}
	}

	/**
	 * Initiate function for binding event listener If you execute 'alarm'
	 * application, this function will be called at first.
	 */
	function init() {
		var i, repeatToggle;

		window.addEventListener("tizenhwkey", keyEventHandler);
	}

	// When page will be loaded, call 'init' function
	window.onload = init();
}());

var alarmHour = 8;
var alarmMin = 20;
var alarm;

function alarmPressed() {
	var checkbox = document.getElementById("alarmToggle");
	var aText = document.getElementById("alarmText");
	if (checkbox.checked === true) {
		aText.innerHTML = alarmHour + ":" + alarmMin;
		var today = new Date();
		today.setHours(alarmHour);
		today.setMinutes(alarmMin);
		alarm = new tizen.AlarmAbsolute(today);
		var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
		tizen.alarm.add(alarm,
				tizen.application.getCurrentApplication().appInfo.id, appControl);
		console.log("Alarm added with id: " + alarm.id);
		console.log("Alarm date: " + today.getHours() + ":" + today.getMinutes());
	} else {
		aText.innerHTML = "Off";
		try {
			tizen.alarm.remove(alarm.id);
			console.log("Successfully removed the alarm.");
		} catch (error) {
			console.log("Failed to remove the alarm.");
		}
	}

}

function editPressed() {
	tau.changePage("#edit-alarm-page");
}

function doneEditingPressed() {
	var time = document.getElementById("time_input").value;
	alarmHour = time.split(':')[0];
	alarmMin = time.split(':')[1];
	tau.changePage("#main-page");
}

function startAlarm() {
	alert("Alarm!");
	navigator.vibrate([ 1000, 500, 1000, 500 ]);
}
