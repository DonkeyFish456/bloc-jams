var createSongRow = function(songNumber, songName, songLength) {
	var template = 
		'<tr class="album-view-song-item">'
		+ '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+ '  <td class="song-item-title">' + songName + '</td>'
		+ '  <td class="song-item-duration">' + songLength + '</td>'
		+ '</tr>'
		;
	/* 
	////////////BLOC SOLUTION/////////////
	
  	var onHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = songNumberCell.attr('data-song-number');

		if (songNumber !== currentlyPlayingSong) {
			songNumberCell.html(playButtonTemplate);
			}
	};

	var offHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = songNumberCell.attr('data-song-number');

		if (songNumber !== currentlyPlayingSong) {
			songNumberCell.html(songNumber);
		}
    };
	
	var clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
};
	*/
	
	
	var onHover = function(event) {
		if (songNumber !== currentlyPlayingSongNumber){
		$(this).find('.song-item-number').empty().append(playButtonTemplate)
		};
	};
	
	var offHover = function(event) {
		if (songNumber !== currentlyPlayingSongNumber){
		$(this).find('.song-item-number').empty().text(songNumber)
		};
	};
	
	var $row = $(template);
	
	var clickHandler = function(event){
		if (currentlyPlayingSongNumber === null) {
			currentlyPlayingSongNumber = songNumber
			$(this).find('.song-item-number').empty().append(pauseButtonTemplate)
		} else if (currentlyPlayingSongNumber === songNumber) {
			$(this).find('.song-item-number').empty().append(playButtonTemplate)
			currentlyPlayingSongNumber = null
		} else {
			$('.song-item-number').children().parent().empty().text(currentlyPlayingSongNumber)
			$(this).find('.song-item-number').empty().append(pauseButtonTemplate)
			currentlyPlayingSongNumber = songNumber
			
		}
		
	};


	
	$row.click(clickHandler);
	$row.on('click', updatePlayerBarSong)
	$row.hover(onHover, offHover);
	return $row;
};
/*
var updatePlayerBarSong =  function(event){
	var currentSong = $(this).find('.song-item-title').text();
	var currentSongIndex = currentlyPlayingSongNumber -1
	var currentSongArtist = $('.album-view-artist').text();
	var currentSongAlbum = $('.album-view-title').text();
	var currentSongMobile = currentSongArtist + " - " + currentSong;
	var currentSongDuration = $(this).find('.song-item-duration').text();
	console.log(currentSongIndex)
	$('.player-bar .song-name').empty().text(currentSong)
	$('.player-bar .artist-song-mobile').empty().text(currentSongMobile)
	$('.player-bar .artist-name').empty().text(currentSongArtist)
	$('.player-bar .total-time').empty().text(currentSongDuration)
	if (currentlyPlayingSongNumber) {
		$('.player-bar .play-pause').empty().append(playerBarPauseButton)
	} else {
		$('.player-bar .play-pause').empty().append(playerBarPlayButton)
	}
}
*/

var updatePlayerBarSong = function(){
	var currentsongNumber = currentlyPlayingSongNumber
	var currentSongLine = $('.album-view-song-list').find('.song-item-number[data-song-number="'+ currentsongNumber +'"]').parent()
	var currentSong = currentSongLine.find('.song-item-title').text();	
	var currentSongArtist = $('.album-view-artist').text();
	var songAlbum = $('.album-view-title').text();
	var currentSongMobile = currentSongArtist + " - " + currentSong;
	var currentSongDuration = currentSongLine.find('.song-item-duration').text();
	$('.player-bar .song-name').empty().text(currentSong)
	$('.player-bar .artist-song-mobile').empty().text(currentSongMobile)
	$('.player-bar .artist-name').empty().text(currentSongArtist)
	$('.player-bar .total-time').empty().text(currentSongDuration)
	if (currentsongNumber) {
		$('.player-bar .play-pause').empty().append(playerBarPauseButton)
	} else {
		$('.player-bar .play-pause').empty().append(playerBarPlayButton)
	}
	
}



var setCurrentAlbum = function(album) {
	currentAlbum = null;
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list')
	$albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
	$albumSongList.empty();
	totalTracks = album.songs.length
	
	for (var i = 0; i < album.songs.length; i++) {
		//nextSong()
		var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
		
	}
	
};



var nextSong = $('.main-controls').on('click', '.ion-skip-forward',  function(){
	$('.album-song-button').parent().empty().text(currentlyPlayingSongNumber)
	currentlyPlayingSongNumber =  ((totalTracks + currentlyPlayingSongNumber)%totalTracks) + 1
	$('.album-view-song-list').find('.song-item-number[data-song-number="'+ currentlyPlayingSongNumber+'"]').empty().append(pauseButtonTemplate)
	updatePlayerBarSong()

})

var previousSong = $('.main-controls').on('click', '.ion-skip-backward',  function(){
	$('.album-song-button').parent().empty().text(currentlyPlayingSongNumber)
	var songIndex = currentlyPlayingSongNumber - 1
	currentlyPlayingSongNumber =  ((totalTracks + (songIndex -1))%totalTracks) + 1
	$('.album-view-song-list').find('.song-item-number[data-song-number="'+ currentlyPlayingSongNumber+'"]').empty().append(pauseButtonTemplate)
	updatePlayerBarSong()

})

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var totalTracks = null
var currentlyPlayingSongNumber = null;
var currentAlbum = null;
var currentSongFromAlbum = null;

$(document).ready(function() {
	setCurrentAlbum(albumPicasso);

	var albums = [albumPicasso, albumMarconi, albumBloc]
	var index = 0
	$('.album-cover-art').on('click',function(event){
		index = (albums.length + (index + 1))% albums.length
		setCurrentAlbum(albums[index])
	})
	
	nextSong
	previousSong
	
	

});




















