



var now_playing = document.querySelector(".now-playing");
var track_art = document.querySelector(".track-art");
var track_name = document.querySelector(".track-name");
var track_artist = document.querySelector(".track-artist");

var playpause_btn = document.querySelector(".playpause-track");
var next_btn = document.querySelector(".next-track");
var prev_btn = document.querySelector(".prev-track");

var seek_slider = document.querySelector(".seek_slider");
var volume_slider = document.querySelector(".volume_slider");
var curr_time = document.querySelector(".current-time");
var total_duration = document.querySelector(".total-duration");

var updateTimer;


var playlist = [
    { 
        'file': '01-RYBLWTLN.mp3',
        'name': '01-RYBLWTLN',
        'artist': 'QiYunFaShi',
    },{
        'file': '02-XZJXSZ.mp3',
        'name': '02-XZJXSZ',
        'artist': 'QiYunFaShi',
    },{
        'file': '03-GDBSSZ.mp3',
        'name': '03-GDBSSZ',
        'artist': 'BenShanBenHuan',
    },{
        'file': '04-ZTSZ.mp3',
        'name': '04-ZTSZ',
        'artist': 'BenShanBenHuan',
    },{
        'file': '05-SWLSJDGMWTLN.mp3',
        'name': '05-SWLSJDGMWTLN',
        'artist': 'HuiPuFaShi',
    },{
        'file': '06-YSGDZY.mp3',
        'name': '06-YSGDZY',
        'artist': 'QiYunFaShi',
    },{
        'file': '07-GYLGZY.mp3',
        'name': '07-GYLGZY',
        'artist': 'HuiPuFaShi',
    },{
        'file': '08-QFMZZY.mp3',
        'name': '08-QFMZZY',
        'artist': 'BenShanBenHuan',
    },{
        'file': '09-WSZ.mp3',
        'name': '09-WSZ',
        'artist': 'BenShanBenHuan',
    },{
        'file': '10-DJXTNZ.mp3',
        'name': '10-DJXTNZ',
        'artist': 'QiYunFaShi',
    }
]



var isPlaying = false;

var i = 0;

var audioPlayer = document.getElementById('audio');


audioPlayer.onended = function(){
	
    if(i < playlist.length){
	++i;
	audioPlayer.src = playlist[i].file;
	loadTrack(i);
 
    } 
}



function playpauseTrack() {
  if (!isPlaying)  playTrack() ;
  else pauseTrack();
}

function playTrack() {
  audioPlayer.play();
  loadTrack(i);
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}


function nextTrack() {
  if (i < playlist.length - 1)
    i += 1;
  else i = 0;
  audioPlayer.src = playlist[i].file;
  playTrack();
  loadTrack(i);
}

function prevTrack() {
  if (i > 0)
    i -= 1;
  else i = playlist.length;
  audioPlayer.src = playlist[i].file;
  playTrack();
  loadTrack(i);
}



function once(){
        btnOnce.style.backgroundColor="#32b33f";
        btnLoop.style.backgroundColor="#fff";
        btnPlaylistloop.style.backgroundColor="#fff";
	audioPlayer.onended = function(){
    		if(i = i){
                audioPlay.play();
        	audioPlayer.src = playlist[i].file;
        	} 
          playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
	}
        
       
}


function loop(){
    btnOnce.style.backgroundColor="#fff";
    btnLoop.style.backgroundColor="#32b33f";
    btnPlaylistloop.style.backgroundColor="#fff";
    audio.loop=true;
}


function playlistloop() {
    	btnOnce.style.backgroundColor="#fff";
    	btnLoop.style.backgroundColor="#fff";
    	btnPlaylistloop.style.backgroundColor="#32b33f";
	audioPlayer.onended = function(){
   		nextTrack();
    	} 

}


function reset(){
location.reload();


}






window.serialize = function serialize() {
  var values = [].filter.call(document.getElementsByName('fruits[]'), function(c) {
    return c.checked;
  }).map(function(c) {
    return c.value;
  });
  document.getElementById('serialized').innerText = JSON.stringify(values);
  

audioPlayer.onended = function(){
    if(i < values.length){
        i++;
    } 
        audioPlayer.src = values[i];
	audioPlayer.play();
        playTrack();


	clearInterval(updateTimer);
  	resetValues();

  	track_art.style.backgroundImage = "url(" + values[i].image + ")";
	var str = values[i]
	str = str.substring(0, str.length-4);
 	track_name.textContent = str;
        track_artist.textContent = "";
 	now_playing.textContent = "PLAYING " + (i + 1) + " OF " + values.length;

 	updateTimer = setInterval(seekUpdate, 1000);


}


audioPlayer.src = values[0];
audioPlayer.play();
playTrack();



	clearInterval(updateTimer);
  	resetValues();

  	track_art.style.backgroundImage = "url(" + values[i].image + ")";
	var str = values[i]
	str = str.substring(0, str.length-4);
 	track_name.textContent = str;
        track_artist.textContent = "";
 	now_playing.textContent = "PLAYING " + (i + 1) + " OF " + values.length;

 	updateTimer = setInterval(seekUpdate, 1000);
 


}





    window.addEventListener("DOMContentLoaded", function(){
      slist("sortlist");
    });






	



function loadTrack(i) {
  clearInterval(updateTimer);
  resetValues();

  track_art.style.backgroundImage = "url(" + playlist[i].image + ")";
  track_name.textContent = playlist[i].name;
  track_artist.textContent = playlist[i].artist;
  now_playing.textContent = "PLAYING " + (i + 1) + " OF " + playlist.length;

  updateTimer = setInterval(seekUpdate, 1000);
 
}


function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}



function seekTo() {
  var seekto = audioPlayer.duration * (seek_slider.value / 100);
  audioPlayer.currentTime = seekto;
}


function seekUpdate() {
  var seekPosition = 0;

  if (!isNaN(audioPlayer.duration)) {
    seekPosition = audioPlayer.currentTime * (100 / audioPlayer.duration);

    seek_slider.value = seekPosition;

    var currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    var currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);
    var durationMinutes = Math.floor(audioPlayer.duration / 60);
    var durationSeconds = Math.floor(audioPlayer.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}




function myFunction(){
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}




function slist (target) {
  // (A) GET LIST + ATTACH CSS CLASS
  target = document.getElementById(target);
  target.classList.add("slist");

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  var items = target.getElementsByTagName("li"), current = null;
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;
    
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.addEventListener("dragstart", function (ev) {
      current = this;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    });
    
    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.addEventListener("dragenter", function (ev) {
      if (this != current) { this.classList.add("active"); }
    });

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.addEventListener("dragleave", function () {
      this.classList.remove("active");
    });

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.addEventListener("dragend", function () {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    });
    
    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    });
    
    // (B7) ON DROP - DO SOMETHING
    i.addEventListener("drop", function (evt) {
      evt.preventDefault();
      if (this != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (this == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          this.parentNode.insertBefore(current, this.nextSibling);
        } else {
          this.parentNode.insertBefore(current, this);
        }
      }
    });
  }
}


