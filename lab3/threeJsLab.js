const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

let indexX = 0.5;
let indexY = 0.5;
let lastGesture = "";

// Track current state
let currentColor = 0xffcc00;
let currentScale = 1;
let isRotating = false;
let bounce = 0;

function getFingerStates(landmarks) {
  return {
    thumb: landmarks[4].y < landmarks[3].y - 0.02,
    index: landmarks[8].y < landmarks[6].y - 0.02,
    middle: landmarks[12].y < landmarks[10].y - 0.02,
    ring: landmarks[16].y < landmarks[14].y - 0.02,
    pinky: landmarks[20].y < landmarks[18].y - 0.02
  };
}

function detectGesture(landmarks) {
  const fingers = getFingerStates(landmarks);
  const extended = Object.values(fingers).filter(v => v).length;

  if (extended === 0) return "fist";
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) return "peace";
  if (fingers.thumb && !fingers.index && !fingers.middle) return "thumbsup";
  if (fingers.index && !fingers.middle && !fingers.thumb && !fingers.ring && !fingers.pinky) return "point";
  if (extended === 5) return "palm";
  return "other";
}

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];
    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#A7BBF6', lineWidth: 3});
    drawLandmarks(canvasCtx, landmarks, {color: '#608BE0', lineWidth: 2});

    const tip = landmarks[8];
    indexX = tip.x;
    indexY = tip.y;

    const gesture = detectGesture(landmarks);
    if (gesture !== lastGesture) {
      lastGesture = gesture;

      if (gesture === "peace") {
        currentColor = Math.random() * 0xffffff;
        pineapple.material.color.setHex(currentColor);
      } 
      else if (gesture === "thumbsup") {
        currentScale *= 1.1;
        pineapple.scale.set(currentScale, currentScale, currentScale);
      } 
      else if (gesture === "point") {
        currentScale *= 0.9;
        pineapple.scale.set(currentScale, currentScale, currentScale);
      } 
      else if (gesture === "palm") {
        isRotating = true;
      } 
      else if (gesture === "fist") {
        bounce = 0.2;
      } 
      else {
        isRotating = false;
      }
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => await hands.send({ image: videoElement }),
  width: 300,
  height: 200
});
camera.start();

// === Three.js Scene ===
const scene = new THREE.Scene();
const camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.classList.add("webgl");
document.body.appendChild(renderer.domElement);

// Pineapple (low-poly icosahedron for now)
const geometry = new THREE.IcosahedronGeometry(0.7, 0);
const material = new THREE.MeshStandardMaterial({ color: currentColor, flatShading: true });
const pineapple = new THREE.Mesh(geometry, material);
scene.add(pineapple);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);

camera3D.position.z = 3;

// Animate
function animate() {
  requestAnimationFrame(animate);

  if (isRotating) {
    pineapple.rotation.y += 0.01;
  } else {
    pineapple.rotation.x = (indexY - 0.5) * 4;
    pineapple.rotation.y = (indexX - 0.5) * 4;
  }

  if (bounce > 0.01) {
    pineapple.position.y = Math.sin(Date.now() * 0.01) * bounce;
    bounce *= 0.98;
  } else {
    pineapple.position.y = 0;
  }

  renderer.render(scene, camera3D);
}
animate();
