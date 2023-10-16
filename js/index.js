const btnPlay = document.querySelector("#btn-play");
const btnPlayIcon = document.querySelector("#btn-play-icon");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnRepeat = document.querySelector("#btn-repeat");
const musicThumb = document.querySelector("#music-thumbnail");
const musicName = document.querySelector("#music-name");
const musicAuthor = document.querySelector("#music-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");
const slider = document.querySelector("#slider");
const ulTag = document.querySelector("#songs-list");
const playlist = document.querySelector("#playlist");
const btnPlaylist = document.querySelector("#btn-playlist")
const btnClosePlaylist = document.querySelector("#close")
const repeatIcon = document.querySelector("#repeat-icon")


let currentMusic = Math.floor(Math.random() * musics.length)
//console.log(currentMusic)

window.onload = () => {
  updatePlayer(currentMusic)
  playingSong()
};

btnPlaylist.addEventListener("click", ()=>{
  playlist.classList.toggle("show")
});
btnClosePlaylist.addEventListener("click", ()=>{
  btnPlaylist.click();
});

const updatePlayer = (e) => {
  let music = musics[e];
  musicThumb.style.backgroundImage = `url('${music.thumbnail}')`;
  musicName.innerHTML = music.name;
  musicAuthor.innerHTML = music.author;
  audioPlayer.src = music.path;
  audioPlayer.value = 0;
  setTimeout(() => {
    slider.max = audioPlayer.duration;
    playerDuration.innerHTML = formatTime(audioPlayer.duration);
  }, 300);
};

const playMusic = () => {
  btnPlayIcon.classList.replace("fa-play", "fa-pause");
  audioPlayer.play();
  playingSong();
}

const pauseMusic = () => {
  btnPlayIcon.classList.replace("fa-pause", "fa-play");
  audioPlayer.pause();
  playingSong();
}

btnPlay.addEventListener("click", () => {
    if (audioPlayer.paused) {
    playMusic()
  } else {
    pauseMusic()
  }
});

btnNext.addEventListener("click", () => {
  currentMusic++;
  currentMusic > musics.length
    ? (currentMusic = 0)
    : (currentMusic = currentMusic);
  updatePlayer(currentMusic);
  playMusic()
  playingSong();
});

btnPrev.addEventListener("click", () => {
  currentMusic--;
  currentMusic < 0
    ? (currentMusic = musics.length)
    : (currentMusic = currentMusic);
  updatePlayer(currentMusic);
  playMusic()
  playingSong();
})

btnRepeat.addEventListener("click", () => {
  let getClass = btnRepeat.className
  console.log(getClass)
  if(btnRepeat.classList.contains("repeat")){
    btnRepeat.classList.add("repeat_one")
    btnRepeat.classList.remove("repeat")
    repeatIcon.classList.replace("fa-repeat","fa-rotate-right")
  }
  else if(btnRepeat.classList.contains("repeat_one")){
    btnRepeat.classList.add("shuffle")
    btnRepeat.classList.remove("repeat_one")
    repeatIcon.classList.replace("fa-rotate-right","fa-shuffle")
  }
  else{
    btnRepeat.classList.add("repeat")
    btnRepeat.classList.remove("shuffle")
    repeatIcon.classList.replace("fa-shuffle","fa-repeat")
  }
});

audioPlayer.addEventListener("ended",() => {
    let getClass = btnRepeat.className
    if(btnRepeat.classList.contains("repeat")){
      btnNext.click();
    }
    else if(btnRepeat.classList.contains("repeat_one")){
      audioPlayer.currentTime = 0
      updatePlayer(currentMusic) 
      playMusic();
    }
    else{
      let randIndex = Math.floor((Math.random() * musics.length) + 1)
      do{
        randIndex = Math.floor((Math.random() * musics.length) + 1);
      }while(currentMusic == randIndex)
      currentMusic = randIndex
      updatePlayer(currentMusic) 
      playMusic();
    }
})

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

setInterval(() => {
  slider.value = audioPlayer.currentTime;
  playerCurrentTime.innerHTML = formatTime(audioPlayer.currentTime);
}, 500);

slider.addEventListener("input", () => {
  audioPlayer.currentTime = slider.value;
});

const renderListMusic = () => {
  for (let i = 0; i < musics.length; i++) {
    let liTag = `
              <li li-index=${i} class="song list-group-item">
                  <div class="boxContainer">
                      <div class="box box1"></div>
                      <div class="box box2"></div>
                      <div class="box box3"></div>
                      <div class="box box4"></div>
                      <div class="box box5"></div>
                  </div>
                  <div class="song-info">
                      <div>${musics[i].name}</div>
                      <div>${musics[i].author}</div>
                      <audio src="${musics[i].path}"></audio>
                  </div>
                  <div class="song-duration">
                  ${musics[i].duration}
                  </div>
              </li>
                  `
    ulTag.insertAdjacentHTML("beforeend", liTag);
  }
}
renderListMusic()

const playingSong = () => {
  const allLiTag = ulTag.querySelectorAll("li")
  
  for (let i = 0; i < allLiTag.length; i++) {
    //console.log(allLiTag[i])
    if(allLiTag[i].classList.contains("songPlaying")){
      allLiTag[i].classList.remove("songPlaying");
      let firstChild = allLiTag[i].firstElementChild
      firstChild.classList.remove("show")
    }
    if(allLiTag[i].getAttribute("li-index") == currentMusic){
      allLiTag[i].classList.add("songPlaying");
      let firstChild = allLiTag[i].firstElementChild
      firstChild.classList.add("show")
    }
    allLiTag[i].setAttribute("onclick", "clicked(this)");
  }
}

const clicked = (element) => {
  let getLiIndex = element.getAttribute("li-index");
  currentMusic = getLiIndex;
  updatePlayer(currentMusic);
  playMusic();
  playingSong();
}

