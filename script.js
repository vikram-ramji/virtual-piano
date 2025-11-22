const pianoConfig = [
  { type: "w", key: "Q", note: "./notes/w1.mp3" },
  { type: "b", key: "2", note: "./notes/b1.mp3" },
  { type: "w", key: "W", note: "./notes/w2.mp3" },
  { type: "b", key: "3", note: "./notes/b2.mp3" },
  { type: "w", key: "E", note: "./notes/w3.mp3" },
  { type: "w", key: "R", note: "./notes/w4.mp3" },
  { type: "b", key: "5", note: "./notes/b3.mp3" },
  { type: "w", key: "T", note: "./notes/w5.mp3" },
  { type: "b", key: "6", note: "./notes/b4.mp3" },
  { type: "w", key: "Y", note: "./notes/w6.mp3" },
  { type: "b", key: "7", note: "./notes/b5.mp3" },
  { type: "w", key: "U", note: "./notes/w7.mp3" },
  { type: "w", key: "I", note: "./notes/w8.mp3" },
  { type: "b", key: "9", note: "./notes/b6.mp3" },
  { type: "w", key: "O", note: "./notes/w9.mp3" },
  { type: "b", key: "0", note: "./notes/b7.mp3" },
  { type: "w", key: "P", note: "./notes/w10.mp3" },
  { type: "w", key: "Z", note: "./notes/w11.mp3" },
  { type: "b", key: "S", note: "./notes/b8.mp3" },
  { type: "w", key: "X", note: "./notes/w12.mp3" },
  { type: "b", key: "D", note: "./notes/b9.mp3" },
  { type: "w", key: "C", note: "./notes/w13.mp3" },
  { type: "b", key: "F", note: "./notes/b10.mp3" },
  { type: "w", key: "V", note: "./notes/w14.mp3" },
  { type: "w", key: "B", note: "./notes/w15.mp3" },
  { type: "b", key: "H", note: "./notes/b11.mp3" },
  { type: "w", key: "N", note: "./notes/w16.mp3" },
  { type: "b", key: "J", note: "./notes/b12.mp3" },
  { type: "w", key: "M", note: "./notes/w17.mp3" },
  { type: "w", key: ",", note: "./notes/w18.mp3" },
  { type: "b", key: "L", note: "./notes/b13.mp3" },
  { type: "w", key: ".", note: "./notes/w19.mp3" },
  { type: "b", key: ";", note: "./notes/b14.mp3" },
  { type: "w", key: "/", note: "./notes/w20.mp3" },
  { type: "b", key: "'", note: "./notes/b15.mp3" },
  { type: "w", key: "SHIFT", note: "./notes/w21.mp3" },
];

const piano = document.querySelector(".piano");
const audioMap = {};
let gridCursor = 1;

pianoConfig.forEach(({ type, key, note }) => {
  const keyElement = document.createElement("div");
  keyElement.classList.add("key", type);
  keyElement.dataset.key = key;

  if (type === "w") {
    keyElement.style.gridColumn = `${gridCursor} / span 3`;
    gridCursor += 3;
  } else {
    keyElement.style.gridColumn = `${gridCursor - 1} / span 2`;
  }

  const keyLabel = document.createElement("span");
  keyLabel.classList.add("key-label");
  keyLabel.textContent = key;
  keyElement.appendChild(keyLabel);

  piano.appendChild(keyElement);
  audioMap[key] = new Audio(note);
});

document.addEventListener("keydown", function (e) {
  console.log(e.key);

  const audio = audioMap[e.key.toUpperCase()];
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  const keyElement = piano.querySelector(
    `div[data-key="${e.key.toUpperCase()}"]`
  );
  keyElement.classList.add("active");
});

document.addEventListener("keyup", function (e) {
  const keyElement = piano.querySelector(
    `div[data-key="${e.key.toUpperCase()}"]`
  );
  keyElement.classList.remove("active");
});

piano.addEventListener("mousedown", function (e) {
  if (e.repeat) return;
  const audio = audioMap[e.target.dataset.key];
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
  e.target.classList.add("active");
});

document.addEventListener("mouseup", function () {
  document.querySelectorAll('.active').forEach(key => {
        key.classList.remove('active');
    });
});
