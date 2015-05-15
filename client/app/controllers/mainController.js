(function(){
	'use strict';

	angular
		.module('Playlytics')
		.controller('MainController', MainController);

	MainController.$inject = ['Spotify', 'Playlist', '$log', '$q', '$scope'];

	function MainController(Spotify, Playlist, $log, $q, $scope){

		var vm = this;

		vm.addToPlaylist = addToPlaylist;
		vm.clear = clear;
		vm.name = 'Your playlist';
		vm.isReadonly = true;
		vm.items = Playlist.getItems();
		vm.querySearch = querySearch;
		vm.max = 5;
		vm.removeTrack = removeTrack;
		vm.saveToLocal = Playlist.save;
		vm.showAlert = showAlert;
		vm.timeConvert = Playlist.timeConvert;
		vm.totalPop = 0;
		vm.totalTime = 0;

		function addToPlaylist(item, dur, pop) {
			Playlist.addToList(item, dur, pop);

			vm.totalPop = Playlist.getTotalPop();
			vm.totalTime = Playlist.getTime();
			vm.searchText = '';
		}

		function clear(){
			Playlist.clearList();
			updateView();
		}

		function querySearch (query) {
		  	var deferred = $q.defer();
			var formatted = Spotify.formatQuery(query);

			Spotify
				.getTracks(formatted)
				.then(function(res){
					var tracks = res.data.tracks.items;
					deferred.resolve(tracks);
				})
				.catch(function(err){
					console.log(err);
				})


		  	return deferred.promise;
		}

		function removeTrack(idx){
			Playlist.remove(idx);
			vm.totalTime = Playlist.getTime();
			vm.totalPop = Playlist.getTotalPop();
		}

		function updateView(){
			vm.name = Playlist.getName();
			vm.items = Playlist.getItems();
			vm.totalPop = Playlist.getTotalPop();
			vm.totalTime = Playlist.getTime();
		}

		function showAlert(ev) {
			var title = '', content = '';
			if( !vm.name ){
				title = 'Error!';
				content = 'Enter a unique playlist name!';
			} else if( localStorage.getItem( vm.name ) ){
				title = 'Nice!';
				content = 'Your playlist ' + vm.name + ' has been updated.';
				Playlist.save(vm.name, vm.items, vm.total, vm.totalTime);
			} else {
				title = 'Congrats!';
				content = 'Your playlist ' + vm.name + ' has been saved!';
				Playlist.save(vm.name, vm.items, vm.totalPop, vm.totalTime);
			}

			Playlist.alert(ev, title, content);
		};
	}

})();