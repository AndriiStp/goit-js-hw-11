import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';
const localCurrentTime = localStorage.getItem(currentTime);

const onPlay = function (timeupdate) {
  console.log(timeupdate.seconds);
  localStorage.setItem(currentTime, timeupdate.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(JSON.parse(localCurrentTime) || 0);
