const app = angular.module('songsApp', []);

const songController = app.controller('SongController', ['$http', function($http){
  let self = this;
  console.log('AJS');

  self.newSong = { };
  self.songsArray = [ ];

  self.createSong = function(){
    console.log(self.newSong);
    self.songsArray.push(angular.copy(self.newSong));
    self.addSong(self.newSong);
  };

  self.addSong = function(newSong) {
    console.log(newSong);
    $http({
      method: 'POST',
      url: '/songs',
      data: { song: newSong }
    }).then(function(response){
      console.log('response', response.data);
      self.getSongs();
    }).catch(function(error){
      console.log('Error adding new song', error);
    })
  } // end addSong

  self.getSongs = function(){
    $http({
      method: 'GET',
      url: '/songs'
    }).then(function(response){
      console.log('response', response.data);
      self.songsArray = response.data;
    }).catch(function(error){
      console.log('Error getting songs', error);
    })
  } //end getSongs

  self.deleteSong = function(song) {
    $http({
      method: 'DELETE',
      url: `/songs/${song.id}`
    }).then(function(response) {
      console.log('delete response', response.data);
      self.getSongs();
    }).catch(function(error) {
      console.log('Error on Delete', error);
    })
  }

  self.editSong = function(song){
    song.editing = true;
  }

  self.saveSong = function(song){
    console.log('Updating song', song);
    $http({
      method: 'PUT',
      url: `/songs/${song.id}`,
      data: { song: song }
    }).then(function(response){
      console.log('response', response);
      self.getSongs();
    }).catch(function(error){
      console.log('Error updating song rank', error);
    })
  }

  self.getSongs();
}]);