let piano;

document.addEventListener("DOMContentLoaded", () => {
  piano = new Piano("keyboard");
});

class Piano {
  constructor(id) {
    this.element = document.getElementById(id);
    this.notes = [
      "c",
      "c_sharp",
      "d",
      "d_sharp",
      "e",
      "f",
      "f_sharp",
      "g",
      "g_sharp",
      "a",
      "a_sharp",
      "b",
      "c_2",
    ];

    this.keys;
    this.init();
  }

  keyPressMap() {
    // return ["1", "!", "2", '"', "3", "4", "$", "5", "%", "6", "^", "7", "8"];
    return ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k"];
  }

  audioFile(note) {
    return `${note}.mp3`;
  }

  audioElement(note) {
    const file = this.audioFile(note);
    const audio = new Audio(file);
    return audio;
  }

  init() {
    this.keys = [];
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];
      const element = document.createElement("div");
      element.classList.add("key");
      element.classList.add(`key_${note}`);

      let note_text = note;

      if (note.includes("_")) {
        note_text = note.split("_")[0];
        if (note.includes("sharp")) {
          element.classList.add("black");
        }
      }
      const text = document.createTextNode(note_text);
      element.append(text);

      const sharp = document.createElement("span");
      sharp.innerText = "#";
      if (note.includes("_sharp")) {
        element.append(sharp);
      }

      this.element.append(element);

      element.addEventListener("click", (e) => {
        this.playAudio(key);
      });

      const key = { element: element, note: note };
      this.keys.push(key);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key) {
        const index = this.keyPressMap().indexOf(event.key);
        if (index >= 0) {
          const key = this.keys[index];
          if (key) {
            this.playAudio(key);
          }
        }
      }
    });
  }

  playAudio(key) {
    const audio = this.audioElement(key.note);
    audio.play();

    key.element.classList.remove("playing");

    setTimeout(() => {
      key.element.classList.add("playing");
    }, 30);

    setTimeout(() => {
      this.stopAudio(audio);
    }, 6000);
  }

  stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}
