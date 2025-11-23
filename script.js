const pianoConfig = [
  { type: "w", key: "Q", note: "./assets/notes/w1.mp3" },
  { type: "b", key: "2", note: "./assets/notes/b1.mp3" },
  { type: "w", key: "W", note: "./assets/notes/w2.mp3" },
  { type: "b", key: "3", note: "./assets/notes/b2.mp3" },
  { type: "w", key: "E", note: "./assets/notes/w3.mp3" },
  { type: "w", key: "R", note: "./assets/notes/w4.mp3" },
  { type: "b", key: "5", note: "./assets/notes/b3.mp3" },
  { type: "w", key: "T", note: "./assets/notes/w5.mp3" },
  { type: "b", key: "6", note: "./assets/notes/b4.mp3" },
  { type: "w", key: "Y", note: "./assets/notes/w6.mp3" },
  { type: "b", key: "7", note: "./assets/notes/b5.mp3" },
  { type: "w", key: "U", note: "./assets/notes/w7.mp3" },
  { type: "w", key: "I", note: "./assets/notes/w8.mp3" },
  { type: "b", key: "9", note: "./assets/notes/b6.mp3" },
  { type: "w", key: "O", note: "./assets/notes/w9.mp3" },
  { type: "b", key: "0", note: "./assets/notes/b7.mp3" },
  { type: "w", key: "P", note: "./assets/notes/w10.mp3" },
  { type: "w", key: "Z", note: "./assets/notes/w11.mp3" },
  { type: "b", key: "S", note: "./assets/notes/b8.mp3" },
  { type: "w", key: "X", note: "./assets/notes/w12.mp3" },
  { type: "b", key: "D", note: "./assets/notes/b9.mp3" },
  { type: "w", key: "C", note: "./assets/notes/w13.mp3" },
  { type: "b", key: "F", note: "./assets/notes/b10.mp3" },
  { type: "w", key: "V", note: "./assets/notes/w14.mp3" },
  { type: "w", key: "B", note: "./assets/notes/w15.mp3" },
  { type: "b", key: "H", note: "./assets/notes/b11.mp3" },
  { type: "w", key: "N", note: "./assets/notes/w16.mp3" },
  { type: "b", key: "J", note: "./assets/notes/b12.mp3" },
  { type: "w", key: "M", note: "./assets/notes/w17.mp3" },
  { type: "w", key: ",", note: "./assets/notes/w18.mp3" },
  { type: "b", key: "L", note: "./assets/notes/b13.mp3" },
  { type: "w", key: ".", note: "./assets/notes/w19.mp3" },
  { type: "b", key: ";", note: "./assets/notes/b14.mp3" },
  { type: "w", key: "/", note: "./assets/notes/w20.mp3" },
  { type: "b", key: "'", note: "./assets/notes/b15.mp3" },
  { type: "w", key: "SHIFT", note: "./assets/notes/w21.mp3" },
];

const piano = document.querySelector(".piano");
const cursor = document.querySelector("img");
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
  cursor.src = "./assets/finger-press.png";
  const audio = audioMap[e.target.dataset.key];
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
  e.target.classList.add("active");
});

document.addEventListener("mouseup", function () {
  cursor.src = "./assets/finger-up.png";
  document.querySelectorAll(".active").forEach((key) => {
    key.classList.remove("active");
  });
});

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
