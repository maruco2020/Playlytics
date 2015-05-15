(function(){
	'use strict';

	angular
		.module('Playlytics')
		.factory('Playlist', Playlist);

	Playlist.$inject = ['$mdDialog'];

	function Playlist($mdDialog){


		var name = '';
		var items = [];
		var total = 0;
		var totalPop = 0;
		var totalTime = 0;

		var service = {
			addToList: addToList,
			alert: alert,
			clearList: clearList,
			getItems: getItems,
			getName: getName,
			getTotalPop: getTotalPop,
			getTime: getTime,
			remove: remove,
			save: save,
			timeConvert: timeConvert
		}
		return service;

		function addToList(item, dur, pop){
			items.push(item);
			totalTime = totalTime + dur;
			totalPop = totalPop + pop;
		}

		function alert(ev, title, content){
			$mdDialog.show(
				$mdDialog.alert()
				.title(title)
				.content(content)
				.ariaLabel('Alert')
				.ok('Got it!')
				.targetEvent(ev)
			);
		}

		function clearList(){
			name = '';
			items = [];
			totalPop = 0;
			totalTime = 0;
		}

		function getItems(){
			return items;
		}

		function getName(){
			return name;
		}

		function getTime(){
			return totalTime;
		}

		function getTotalPop(){
			return totalPop;
		}

		function makeNewList(name, items, totalPop, totalTime){
			this.name = name;
			this.items = items;
			this.totalPop = totalPop;
			this.totalTime = totalTime;
			this.tags = [];
		}

		function remove(idx){
			if( typeof idx === 'number' ){
				var remove = items[idx];
				totalTime = totalTime - remove.duration_ms;
				totalPop = totalPop - remove.popularity;
				items.splice(idx, 1);
			}
		}

		function save(name, items, total, time){
			if( !name ){
				throw new Error('Enter a playlist name!');
			} else {
				var playlist = new makeNewList(name, items, total, time);
				localStorage.setItem(name, JSON.stringify(playlist));
			}
		}

		function timeConvert(ms){
			var minutes = Math.floor(ms / 60000);
			var seconds = ((ms % 60000) / 1000).toFixed(0);

			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}

	}
})();