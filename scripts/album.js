var albumPicasso = {
	title: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{title: 'Blue', duration: '4:26'},
		{title: 'Green', duration: '3:14'},
		{title: 'Red', duration: '5:01'},
		{title: 'Pink', duration: '3:21'},
		{title: 'Magenta', duration: '2:15'},
	]
};

var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumBloc = {
     title: 'The Programmer',
     artist: 'Bloc',
     label: 'JS',
     year: '2016',
     albumArtUrl: 'assets/images/album_covers/07.png',
     songs: [
         { title: 'if/else', duration: '3:01' },
         { title: 'For loop', duration: '5:41' },
         { title: 'Brackets', duration: '2:41'},
         { title: 'Nodes', duration: '4:32' },
         { title: 'Git', duration: '2:15'},
		 { title: 'Switch', duration: '3:15'}
     ]
 };

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
		if (songNumber !== currentlyPlayingSong){
		$(this).find('.song-item-number').empty().append(playButtonTemplate)
		};
	};
	
	var offHover = function(event) {
		if (songNumber !== currentlyPlayingSong){
		$(this).find('.song-item-number').empty().text(songNumber)
		};
	};
	
	var $row = $(template);
	
	var clickHandler = function(event){
		if (currentlyPlayingSong === null) {
			currentlyPlayingSong = songNumber
			$(this).find('.song-item-number').empty().append(pauseButtonTemplate)
		} else if (currentlyPlayingSong === songNumber) {
			$(this).find('.song-item-number').empty().append(playButtonTemplate)
			currentlyPlayingSong = null
		} else {
			$('.song-item-number').children().parent().empty().text(currentlyPlayingSong)
			$(this).find('.song-item-number').empty().append(pauseButtonTemplate)
			currentlyPlayingSong = songNumber
		}
	};
	
	$row.click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
};

var setCurrentAlbum = function(album) {
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');
	
	$albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
	$albumSongList.empty();
	
	for (var i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
	}
	
};


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

$(document).ready(function() {
	setCurrentAlbum(albumPicasso);

	var albums = [albumPicasso, albumMarconi, albumBloc]
	var index = 0
	$('.album-cover-art').on('click',function(event){
		index = (albums.length + (index + 1))% albums.length
		setCurrentAlbum(albums[index])
	})
	

});




















