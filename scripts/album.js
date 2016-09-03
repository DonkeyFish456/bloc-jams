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
	
	var onHover = function(event) {
		$(this).find('.song-item-number').empty().addClass('album-song-button ion-play span')
	};
	
	var offHover = function(event) {
		$(this).find('.song-item-number').removeClass('album-song-button ion-play').text(songNumber)
	};
	
	var $row = $(template);
	$row.find('.song-item-number').click(clickHandler);
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

var findParentByClassName = function(element, targetClass) {
	if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    } else if (!element.parentElement.className){
        alert('No parent found')
	} else if (!targetClass.parentElement.className){
        alert('No parent found with that class name')
	}
};

/*
var getSongItem = function(element) {
	console.log(element.className)
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};
*/

 var clickHandler = function(targetElement) {
	 var songItem = getSongItem(targetElement);
	 if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
	 } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }


 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

window.onload = function(){
	setCurrentAlbum(albumPicasso);
	
	songListContainer.addEventListener('mouseover', function(){
		//console.log(event.target);
		if (event.target.parentElement.className === 'album-view-song-item') {
			var songItem = getSongItem(event.target);
			if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	
	for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // Selects first child element, which is the song-item-number element
			//[REMOVED]this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

			var songItem = getSongItem(event.target);
			var songItemNumber = songItem.getAttribute('data-song-number');
			if (songItemNumber !== currentlyPlayingSong) {
					 songItem.innerHTML = songItemNumber;
				 }
		});
		songRows[i].addEventListener('click', function(event) {
             // Event handler call
			clickHandler(event.target);
         });
		
     }
	});
	
	var albums = [albumPicasso, albumMarconi, albumBloc]
	var index = 0
	albumImage.addEventListener('click',function(event){
		index = (albums.length + (index + 1))% albums.length
		setCurrentAlbum(albums[index])
	})
	

};




















