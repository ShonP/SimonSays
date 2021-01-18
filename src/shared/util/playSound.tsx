import Sound from 'react-native-sound';

const sounds = ['1', '2', '3', '4'].map(
  (soundNumber) =>
    `https://s3.amazonaws.com/freecodecamp/simonSound${soundNumber}.mp3`,
);

const playSound = (idx: number) => {
  const track = new Sound(sounds[idx], undefined, (e) => {
    if (e) {
      console.log('error loading track:', e);
    } else {
      track.play();
    }
  });
};

export default playSound;
