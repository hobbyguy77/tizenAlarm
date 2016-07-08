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

		window.addEventListener("tizenhwkey", keyEventHandler);
		navigator.vibrate([ 1000, 500, 1000, 500 ]);
	}

	// When page will be loaded, call 'init' function
	window.onload = init();
}());

