import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const raycast = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var intersects;

const pointLight = new THREE.PointLight(0xffffff, 2, 50);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const boxGeom = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( boxGeom, boxMaterial );

const coneGeom = new THREE.ConeGeometry(1,2,32);
const coneMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cone = new THREE.Mesh(coneGeom,coneMaterial);

const sphereGoemetry = new THREE.SphereGeometry( 1, 32, 16 ); 
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x325ca8 } ); 
const sphere = new THREE.Mesh(sphereGoemetry, sphereMaterial);

const controls = new OrbitControls(camera, renderer.domElement)
var color = new THREE.Color( 0xffffff );

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

scene.add( cone );
scene.add( cube );
scene.add( sphere );

camera.position.z = 7;

sphere.position.x = 0;
cone.position.x = -3;
cube.position.x = 3;


function onPointerClick(){
	
	intersects[0].object.material.color.set(color);
}

function onHover(event){

	pointer.x = (event.clientX/window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY/window.innerHeight) * 2 + 1;

	intersects = raycast.intersectObjects(scene.children);
	
}

function animate() {

	color.setHex( Math.random() * 0xffffff );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	sphere.rotation.x += 0.02;
	sphere.rotation.y += 0.01;

	cone.rotation.x += 0.01;
	cone.rotation.y += 0.01;
	cone.rotation.z += 0.01;

	raycast.setFromCamera(pointer, camera);

	renderer.render( scene, camera );
	controls.update();
	
}

document.body.addEventListener("mousemove", onHover);
document.body.addEventListener('click', onPointerClick)

window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});

