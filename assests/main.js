//==============================================
//                  DARK THEME
//==============================================
const mainScreen = document.querySelector('.main');
const radioBtnTheme = document.querySelector('.js-radioButtonTheme');
radioBtnTheme.addEventListener('click', (e) => {
  if (mainScreen.classList.contains('dark-theme')) {
    mainScreen.classList.remove('dark-theme');
    e.target.children[0].style.left = '2px';
  } else {
    mainScreen.classList.add('dark-theme');
    e.target.children[0].style.left = '37px';
  }
});

//==============================================
//                  Mobile
//==============================================

const navBarMobile = document.querySelector('.js-navbar');
const sidebarMobile = document.querySelector('.js-sidebar');
const barsLeft = document.querySelector('.js-barsLeft');
const hideNavbar = document.querySelector('.js-hide-navbar');
const barsRight = document.querySelector('.js-barsRight');
const hideSidebar = document.querySelector('.js-hide-sidebar');

hideNavbar.addEventListener('click', (e) => {
  if (navBarMobile.classList.contains('active')) {
    navBarMobile.classList.remove('active');
  }
});

hideSidebar.addEventListener('click', (e) => {
  if (sidebarMobile.classList.contains('active')) {
    sidebarMobile.classList.remove('active');
  }
});

barsLeft.addEventListener('click', (e) => {
  navBarMobile.classList.add('active');
  if (sidebarMobile.classList.contains('active')) {
    sidebarMobile.classList.remove('active');
  }
});

barsRight.addEventListener('click', (e) => {
  sidebarMobile.classList.add('active');
  if (navBarMobile.classList.contains('active')) {
    navBarMobile.classList.remove('active');
  }
});

//==============================================
//                  Play Music
//==============================================Music
const song = document.querySelector('.song');
const timerLeft = document.querySelector('.js-timerLeft');
const timerRight = document.querySelector('.js-timerRight');
const playAndPause = document.querySelector('.js-playAndPause');
const range = document.querySelector('.js-range');
const playList = document.querySelector('.js-playList');
const changeVolume = document.querySelector('.js-changeVolume');
const previousSong = document.querySelector('.js-previousSong');
const nextSong = document.querySelector('.js-nextSong');

// Danh sách bài hát
const musics =[
  {
      id: 0,
      number: '01',
      file:'Luu So Em Di - Huynh Van_ Vu Phung Tien.mp3',
      title: 'Lưu Số Em Đi',
      artist: 'Huỳnh Văn - Vũ Phụng Tiên',
      time: '4:16',
      active: true,
  },
  {
      id: 1,
      number: '02',
      file: 'Cham-Quinn.mp3',
      title: 'Chạm',
      artist: 'Quinn',
      time: '5:03',
      active: false,
  },
  {
      id: 2,
      number: '03',
      file: 'Nang Tho - Hoang Dung.mp3',
      title: 'Nàng Thơ',
      artist: 'Hoàng Dũng',
      time: '4:14',
      active: false,
  },
  {
      id: 3,
      number: '04',
      file: 'Ngay Khong Co Em - ThinK.mp3',
      title: 'Ngày Không Có Em',
      artist: 'Think',
      time: '4:23',
      active: false,
  },
  {
      id: 4,
      number: '05',
      file: 'Tuoi-23-Ngo-Lan-Huong.mp3',
      title: 'Tuổi 23',
      artist: 'Ngô Lan Hương',
      time: '4:48',
      active: false,
  },
];

// Set default audio
song.setAttribute('src', `./assests/mp3/${musics[0].file}`);

for (let i = 0 ; i < musics.length; i++) {
  playList.insertAdjacentHTML('beforeend', 
  `<tr class="js-chooseSong ${musics[i].active ? 'active' : ''}" data-index=${musics[i].id}>
    <td>${musics[i].number}</td>
    <td>${musics[i].title}</td>
    <td>${musics[i].artist}</td>
    <td>${musics[i].time}</td>
  </tr>`)
}

// Change volume
changeVolume.addEventListener('change' , () => {
  song.volume = changeVolume.value / 10;
});

// Change timer run music
range.addEventListener('change', () => {
  song.currentTime = range.value;
});

// const changeSong
const changeSong = (currentIndex, nextIndex) => {
  const listSong = document.querySelectorAll('.js-chooseSong');
  listSong[currentIndex].classList.remove('active');
  listSong[nextIndex].classList.add('active');
  musics[currentIndex].active = false;
  musics[nextIndex].active = true;
  song.setAttribute('src', `./assests/mp3/${musics[nextIndex].file}`);
  playAndPause.classList.add('fa-pause-circle');
  playAndPause.classList.remove('fa-play-circle');
  song.play();
};

// Choose Song
playList.addEventListener('click', (e) => {
  const chooseSong = e.target.closest('.js-chooseSong');
  const currentIndex = chooseSong.getAttribute('data-index');
  const indexRecordActive = musics.findIndex(item => item.active);
  changeSong(indexRecordActive, currentIndex);
});

// AUto play next
song.addEventListener('ended', () => {
  const indexRecordActive = musics.findIndex(item => item.active);
  if (indexRecordActive === musics.length - 1 ) {
    changeSong(indexRecordActive, 0);
  } else {
    changeSong(indexRecordActive, indexRecordActive + 1);
  }
  
});

// Next sang bài tiếp theo
nextSong.addEventListener('click', () => {
  const indexRecordActive = musics.findIndex(item => item.active);
  if (indexRecordActive === musics.length - 1) {
    changeSong(indexRecordActive, 0);
  } else {
    changeSong(indexRecordActive, indexRecordActive + 1);
  }
});

// Quay lại bái hát phía trước
previousSong.addEventListener('click', () => {
  const indexRecordActive = musics.findIndex(item => item.active);
  if (indexRecordActive === 0) {
    changeSong(indexRecordActive, musics.length - 1);
  } else {
    changeSong(indexRecordActive, indexRecordActive - 1);
  }
});

// Phát và dừng nhac 
let checkPlay = false;
playAndPause.addEventListener('click', (e) => {
  checkPlay = !checkPlay;
  if (checkPlay) {
    e.target.classList.add('fa-pause-circle');
    e.target.classList.remove('fa-play-circle');
    song.play();
  } else {
    e.target.classList.remove('fa-pause-circle');
    e.target.classList.add('fa-play-circle');
    song.pause();
  }
});

// Get time chạy nhạc
const displayTimerMusic = () => {

  const { duration, currentTime } = song;
  timerRight.textContent = formatTimer(duration);
  timerLeft.textContent = formatTimer(currentTime);
  range.value = currentTime;
  range.max = duration;
}

const formatTimer = (time) => {
  const mins = Math.floor(time / 60);
  let secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return mins + ':' + secs;
};


displayTimerMusic();

range.value = 0;
setInterval(() => {
  displayTimerMusic();
}, 1000); 





