const tools = [
  ["gloves", "Gloves", "🧤"],
  ["sponge", "Sponge", "🧽"],
  ["mop", "Mop", "🧹"],
  ["brush", "Brush", "🖌️"],
  ["bag", "Trash Bag", "🗑️"],
  ["watering", "Watering Can", "🪣"],
];
const dirtyAssets = {
  bedroom: "/public/assets/rooms/bedroom-dirty.jpg",
  dining: "/public/assets/rooms/dining-dirty.jpg",
  kitchen: "/public/assets/rooms/kitchen-dirty.jpg",
  living: "/public/assets/rooms/living-dirty.png",
};
const taskLayers = {
  bedroom: {
    bed: [[62, 30, 32, 34]],
    desk: [[30, 16, 30, 28]],
    wardrobe: [[3, 14, 23, 45]],
    floor: [
      [20, 51, 20, 23],
      [41, 48, 18, 19],
      [55, 61, 23, 23],
      [25, 74, 22, 15],
      [47, 78, 22, 16],
    ],
  },
  dining: {
    table: [[28, 27, 47, 48]],
    wall: [
      [65, 8, 14, 21],
      [83, 29, 13, 27],
    ],
    floor: [
      [12, 65, 22, 20],
      [47, 78, 25, 17],
      [72, 62, 20, 26],
    ],
    bin: [[1, 35, 22, 35]],
  },
  kitchen: {
    "sink-dishes": [
      [
        0,
        0,
        0,
        0,
        "polygon(55% 28%,61% 24%,68% 25%,76% 29%,79% 34%,77% 41%,70% 44%,62% 41%,56% 39%)",
      ],
    ],
    floor: [
      [0, 0, 0, 0, "polygon(43% 61%,51% 59%,58% 64%,58% 71%,52% 73%,45% 69%)"],
      [0, 0, 0, 0, "polygon(29% 71%,33% 69%,35% 72%,32% 74%,28% 74%)"],
      [0, 0, 0, 0, "polygon(49% 72%,53% 70%,56% 73%,55% 76%,50% 76%)"],
      [0, 0, 0, 0, "polygon(59% 78%,65% 76%,68% 79%,66% 82%,61% 82%)"],
      [0, 0, 0, 0, "polygon(71% 82%,75% 80%,78% 83%,77% 86%,72% 86%)"],
      [0, 0, 0, 0, "polygon(78% 75%,81% 74%,83% 76%,81% 78%,78% 78%)"],
    ],
    fridge: [
      [0, 0, 0, 0, "polygon(77% 40%,87% 42%,90% 48%,90% 80%,84% 84%,78% 79%)"],
    ],
    counter: [
      [
        0,
        0,
        0,
        0,
        "polygon(30% 16%,57% 16%,58% 24%,53% 27%,48% 24%,42% 27%,36% 24%,31% 23%)",
      ],
    ],
  },
  living: {
    sofa: [
      [20, 40, 12, 15],
      [29, 31, 17, 17],
      [40, 34, 14, 13],
      [22, 47, 12, 11],
    ],
    table: [
      [11, 55, 20, 18],
      [29, 60, 13, 12],
      [39, 57, 12, 23],
      [49, 53, 14, 20],
      [60, 56, 13, 16],
      [71, 61, 18, 23],
      [54, 76, 17, 11],
      [77, 72, 13, 13],
    ],
    bin: [[84, 34, 15, 28]],
    plant: [
      [3, 10, 13, 31],
      [9, 7, 10, 18],
    ],
  },
};
// Dense overlapping countertop objects use one transparent asset, so there are no seams.
const transparentTaskLayers = {
  // Bedroom layers retain the source scene's full 1706×1279 canvas, keeping
  // every disconnected dirty object locked to the same coordinate system.
  bedroom: {
    bed: {
      src: "/public/assets/generated/bedroom-bed-dirty-layer.png?v=20260925-4",
      left: 0,
      top: 0,
      width: 100,
    },
    desk: {
      src: "/public/assets/generated/bedroom-desk-dirty-layer.png?v=20260925-4",
      left: 0,
      top: 0,
      width: 100,
    },
    wardrobe: {
      src: "/public/assets/generated/bedroom-wardrobe-dirty-layer.png?v=20260925-4",
      left: 0,
      top: 0,
      width: 100,
    },
    floor: {
      src: "/public/assets/generated/bedroom-floor-dirty-layer.png?v=20260925-4",
      left: 0,
      top: 0,
      width: 100,
    },
  },
  kitchen: {
    fridge: {
      // This is cut from the original 1706×1279 dirty scene, rather than a
      // separately generated fridge. Keeping the full artboard makes its
      // doors, cabinet edge and floor shadow share the base-image coordinates.
      src: "/public/assets/generated/kitchen-fridge-original-aligned.png",
      left: 0,
      top: 0,
      width: 100,
    },
  },
  // Living room tasks use full-canvas PNG overlays.  Do not fall back to the
  // legacy rectangular dirty-image clips: those clips expose background pixels
  // and create visible boxes around each object.
  living: {
    sofa: {
      src: "/public/assets/generated/room-task-sofa.png?v=20260925-5",
      left: 0,
      top: 0,
      width: 100,
    },
    table: {
      src: "/public/assets/generated/room-task-table.png?v=20260925-5",
      left: 0,
      top: 0,
      width: 100,
    },
    bin: {
      src: "/public/assets/generated/room-task-bin.png?v=20260925-5",
      left: 0,
      top: 0,
      width: 100,
    },
    plant: {
      src: "/public/assets/generated/room-task-plant.png?v=20260925-5",
      left: 0,
      top: 0,
      width: 100,
    },
  },
};
const rooms = [
  [
    "bedroom",
    "Bedroom",
    "🛏️",
    "/public/assets/generated/bedroom-clean-aligned.png",
    "#ff9f82",
    [
      [
        "bed",
        "Make the Bed",
        "gloves",
        62,
        30,
        32,
        34,
        "🛏️",
        "Put the toys and books away. Make the bed neat.",
      ],
      ["desk", "Tidy the Desk", "gloves", 30, 16, 30, 28, "✏️", "Put away the stationery and paper balls."],
      [
        "floor",
        "Clean the Floor",
        "mop",
        20,
        51,
        57,
        40,
        "👣",
        "Footprints, toys, and paper scraps are gone.",
      ],
      ["wardrobe", "Tidy the Closet", "gloves", 3, 14, 23, 45, "👕", "Hang the clothes neatly."],
    ],
  ],
  [
    "dining",
    "Dining Room",
    "🍽️",
    "/public/assets/generated/dining-clean-aligned.png",
    "#ffbd4c",
    [
      ["table", "Clear the Table", "gloves", 28, 27, 47, 48, "🍽️", "The dishes and trash are put away."],
      ["wall", "Clean the Wall", "sponge", 65, 8, 31, 48, "✨", "The wall stains are gone."],
      ["floor", "Mop the Floor", "mop", 12, 65, 80, 30, "💧", "The floor is clean."],
      ["bin", "Empty the Trash Bin", "bag", 1, 35, 22, 35, "🗑️", "The trash bin is empty."],
    ],
  ],
  [
    "kitchen",
    "Kitchen",
    "🍳",
    "/public/assets/generated/kitchen-clean-registered.png",
    "#72cbd0",
    [
      [
        "counter-dishes",
        "Clear the Counter Dishes",
        "gloves",
        2,
        21,
        42,
        42,
        "🍽️",
        "The counter dishes are put away.",
      ],
      [
        "sink-dishes",
        "Wash the Sink Dishes",
        "sponge",
        51,
        23,
        25,
        24,
        "🫧",
        "Bubbles appear. The sink is clean.",
      ],
      ["floor", "Mop the Floor", "mop", 25, 57, 52, 34, "💧", "Puddles and crumbs are gone."],
      ["fridge", "Close the Fridge Door", "gloves", 75, 34, 20, 48, "🚪", "The fridge door closes."],
      [
        "counter",
        "Wipe the Counter",
        "sponge",
        31,
        13,
        29,
        18,
        "🧽",
        "Oil stains and drips are wiped away.",
      ],
    ],
  ],
  [
    "living",
    "Living Room",
    "🛋️",
    "/public/assets/generated/living-clean-registered.png",
    "#7abfd1",
    [
      [
        "sofa",
        "Tidy the Sofa",
        "gloves",
        18,
        29,
        40,
        31,
        "🛋️",
        "Straighten the cushions and fold the blanket.",
      ],
      [
        "table",
        "Clear the Coffee Table",
        "gloves",
        25,
        55,
        65,
        34,
        "🧃",
        "Cans and papers are put away.",
      ],
      ["bin", "Empty the Trash Bin", "bag", 85, 35, 13, 29, "🗑️", "The trash bin is empty."],
      [
        "plant",
        "Water the Plant",
        "watering",
        3,
        9,
        19,
        45,
        "🪴",
        "The leaves turn green and sway.",
      ],
    ],
  ],
];
const root = document.querySelector("#root"),
  key = "little-cleaner-progress-v1";
let progress = JSON.parse(localStorage.getItem(key) || "{}"),
  roomId = null,
  selected = null,
  message = "Choose a tool and start cleaning!",
  cleaning = false;
const roomBy = (id) => rooms.find((room) => room[0] === id),
  done = (room) => progress[room[0]] || [],
  save = () => localStorage.setItem(key, JSON.stringify(progress)),
  route = () => location.hash.replace(/^#\/?/, "");
function navigate(id) {
  location.hash = id ? `/${id}` : "/";
}
function home() {
  const all = rooms.every((room) => done(room).length === room[5].length);
  root.innerHTML = `<main class="home"><div class="home-inner"><div class="hero"><span>🧹</span><div><p>Let’s make every room sparkle!</p><h1>Little Cleaners</h1></div></div><div class="room-cards">${rooms
    .map((room) => {
      const count = done(room).length,
        complete = count === room[5].length;
      return `<button class="room-card ${complete ? "is-done" : ""}" data-room="${room[0]}" style="--accent:${room[4]}"><span class="card-icon">${room[2]}</span><span class="card-name">${room[1]}</span><span class="card-progress">${complete ? "All Clean ✓" : `${count} / ${room[5].length} done`}</span><i><b style="width:${(count / room[5].length) * 100}%"></b></i></button>`;
    })
    .join(
      "",
    )}</div>${all ? '<div class="all-done">🎉 Every room is clean!</div>' : ""}<button class="reset" id="reset">Start Over</button></div></main>`;
  document
    .querySelectorAll("[data-room]")
    .forEach(
      (button) => (button.onclick = () => navigate(button.dataset.room)),
    );
  document.querySelector("#reset").onclick = () => {
    progress = {};
    // Remove, rather than overwrite, so a stale saved room list can never be
    // rehydrated after returning from a room route.
    localStorage.removeItem(key);
    home();
  };
}
function scene(id) {
  roomId = id;
  selected = null;
  message = "Choose a tool and start cleaning!";
  renderScene();
}
function renderTaskLayer(room, task, index) {
  const asset = transparentTaskLayers[room[0]]?.[task[0]];
  if (asset)
    return `<img class="dirty-overlay-asset task-${task[0]}" src="${asset.src}" style="position:absolute;z-index:1;display:block;height:auto;pointer-events:none;left:${asset.left}%;top:${asset.top}%;width:${asset.width}%" alt=""/>`;
  const fragments = taskLayers[room[0]][task[0]] || [
    [task[3], task[4], task[5], task[6]],
  ];
  return fragments
    .map((fragment, fragmentIndex) => {
      const clip =
        fragment[4] ||
        `inset(${fragment[1]}% ${100 - fragment[0] - fragment[2]}% ${100 - fragment[1] - fragment[3]}% ${fragment[0]}%)`;
      return `<img class="scene-image dirty-fragment task-${task[0]}" src="${dirtyAssets[room[0]]}" style="clip-path:${clip};--delay:${(index + fragmentIndex) * 30}ms" alt=""/>`;
    })
    .join("");
}
function renderScene() {
  const room = roomBy(roomId),
    finished = done(room),
    percentage = Math.round((finished.length / room[5].length) * 100),
    fragments = room[5]
      .filter((task) => !finished.includes(task[0]))
      .map((task, index) => renderTaskLayer(room, task, index))
      .join("");
  root.innerHTML = `<main class="game-shell" style="--accent:${room[4]}"><header class="topbar"><button class="back" id="home">← Home</button><div class="room-title">${room[2]} ${room[1]}</div><div class="progress"><span>Progress</span><div class="track"><i style="width:${percentage}%"></i></div><b>${finished.length} / ${room[5].length}</b></div></header><section class="room-layout"><div class="scene ${selected ? "tool-active" : ""}"><img class="scene-image clean-base" src="${room[3]}" alt="${room[1]} scene"/>${fragments}${room[5].map((task) => `<button class="hotspot ${finished.includes(task[0]) ? "completed" : ""}" data-task="${task[0]}" style="left:${task[3]}%;top:${task[4]}%;width:${task[5]}%;height:${task[6]}%">${finished.includes(task[0]) ? "<em>✓</em>" : ""}</button>`).join("")}${selected ? `<div class="cursor-tool" aria-hidden="true">${tools.find((tool) => tool[0] === selected)[2]}</div>` : ""}</div><aside class="toolbox"><h2>Cleaning Tools</h2><p>Choose a tool, then click the room.</p><div class="tool-grid">${tools.map((tool) => `<button data-tool="${tool[0]}" class="${selected === tool[0] ? "selected" : ""}"><span>${tool[2]}</span><small>${tool[1]}</small></button>`).join("")}</div><div class="tip">${message}</div></aside></section></main>`;
  // Put every visual layer in one fixed-aspect-ratio artboard. The outer scene
  // may resize freely; this inner coordinate system never crops independently.
  const sceneElement = document.querySelector(".scene");
  const sceneCanvas = document.createElement("div");
  sceneCanvas.className = "scene-canvas";
  while (sceneElement.firstChild) sceneCanvas.append(sceneElement.firstChild);
  sceneElement.append(sceneCanvas);
  const fitCanvas = () => {
    const ratio = room[6] || 1706 / 1279;
    sceneCanvas.style.aspectRatio = ratio;
    const scaleWidth = Math.min(sceneElement.clientWidth, sceneElement.clientHeight * ratio);
    sceneCanvas.style.width = `${scaleWidth}px`;
  };
  fitCanvas();
  window.onresize = fitCanvas;

  document.querySelector("#home").onclick = () => navigate("");
  document.querySelectorAll("[data-tool]").forEach(
    (button) =>
      (button.onclick = () => {
        selected =
          selected === button.dataset.tool ? null : button.dataset.tool;
        message = selected
          ? `${tools.find((tool) => tool[0] === selected)[1]} selected.`
          : "Tool deselected.";
        renderScene();
      }),
  );
  document
    .querySelectorAll("[data-task]")
    .forEach(
      (button) => (button.onclick = () => complete(button.dataset.task)),
    );
  sceneCanvas.onmousemove = (event) => {
    const cursor = sceneCanvas.querySelector(".cursor-tool");
    if (cursor) {
      const rect = sceneCanvas.getBoundingClientRect();
      cursor.style.left = `${event.clientX - rect.left}px`;
      cursor.style.top = `${event.clientY - rect.top}px`;
    }
  };
}
function complete(id) {
  const room = roomBy(roomId),
    task = room[5].find((item) => item[0] === id),
    current = done(room);
  if (cleaning || current.includes(id)) return;
  if (!selected) {
    message = "Choose a tool on the right first!";
    renderScene();
    return;
  }
  if (selected !== task[2]) {
    message = "Try a different tool for this job.";
    renderScene();
    return;
  }
  cleaning = true;
  document.querySelector(`[data-task="${id}"]`).classList.add("cleaning");
  document.querySelector(".tip").textContent = "Cleaning…";
  setTimeout(() => {
    progress = { ...progress, [room[0]]: [...current, id] };
    save();
    selected = null;
    cleaning = false;
    message = task[8];
    renderScene();
    if (done(room).length === room[5].length)
      setTimeout(() => celebrate(room), 550);
  }, 720);
}
function celebrate(room) {
  const all = rooms.every((item) => done(item).length === item[5].length),
    modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<div class="celebration" role="dialog" aria-modal="true"><button class="modal-close" id="modal-close" aria-label="Close celebration">×</button><div class="confetti">✦ ✧ ★ ✦ ✧</div><div class="big-icon">${room[2]}</div><h2>${room[1]} is all clean!</h2><p>${all ? "Every room is sparkling clean. Great job!" : "This room looks wonderful. Great job!"}</p><div class="modal-actions"><button class="primary" id="modal-home">Back to Home</button></div></div>`;
  document.body.append(modal);
  modal.querySelector("#modal-close").onclick = () => modal.remove();
  modal.querySelector("#modal-home").onclick = () => {
    modal.remove();
    navigate("");
  };
}
function renderRoute() {
  const id = route();
  if (id && roomBy(id)) scene(id);
  else home();
}
window.addEventListener("hashchange", renderRoute);
renderRoute();
