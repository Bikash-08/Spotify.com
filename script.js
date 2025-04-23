console.log("Welcome to Spotify");

//Initialized the Variable
let songIndex=0;
let audioElement = new Audio('1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: 'Salam-E-Ishq', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: 'Let Me Love You', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: 'Yeh Dil Hai Muskil', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: 'Kabhi Khusi Kabhi Gam', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: 'Bhula Dena Mujhe', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: 'Rabba Rabba', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: 'Tera Fitoor', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: 'No Body Loves Me', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
]

songItems.forEach((Element, i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//AudioElement.Play();

//Handle Play/Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('bi-play-circle');
        masterPlay.classList.add('bi-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bi-pause-circle');
        masterPlay.classList.add('bi-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to Event
audioElement.addEventListener('timeupdate',()=>{
    //Update Seek Bar
    progress = parseInt((audioElement.currentTime/audioElement.duration) *100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{ 
        element.classList.remove('bi-pause-circle');
        element.classList.add('bi-play-circle');    
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bi-play-circle');
        e.target.classList.add('bi-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('bi-play-circle');
        masterPlay.classList.add('bi-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');
})
