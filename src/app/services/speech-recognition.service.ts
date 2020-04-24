
export class SpeechRecognitionService {

  constructor() { }

  startSpeechRecognition() {
    // @ts-ignore
    window.plugins.speechRecognition.hasPermission((speechRecog) => {
      if (speechRecog){
        this.startspeech();
      } else {
        this.requestPermission();
      }
    }, () => {
      console.log('hasPermission failed');
    });
  }

  private requestPermission() {
    // @ts-ignore
    window.plugins.speechRecognition.requestPermission(() => {
        this.startspeech();
    }, () => {
      console.log('requestPermission failed');
    });
  }

  private startspeech() {
    const options = {
      language: 'en-US',
      matches: '10',
      prompt: 'start speaking',
      showPopup: true,
      showPartial: false
    };
// @ts-ignore
    window.plugins.speechRecognition.startListening((items) => {
        console.log(items);
      }, () => {
        console.log('startspeech failed');
      },  options);
  }
}
