import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';





const scene = new THREE.Scene();

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader().load('./pall.jpeg')

const pgeometry = new THREE.PlaneGeometry(100, 100);

const geometry = new THREE.BoxGeometry(2, 2, 2);
let geometry1 = new THREE.BoxGeometry(2, 2, 2);
let geometry2 = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ map: loader });
let material2 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
let material3 = new THREE.MeshLambertMaterial({ color: 0x0000ff });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const cube3 = new THREE.Mesh(geometry1, material);
scene.add(cube3);

const cube2 = new THREE.Mesh(geometry2, material);
scene.add(cube2);

let materialwf = new THREE.MeshLambertMaterial({ color: 0xffffff});
const plane = new THREE.Mesh(pgeometry, materialwf);
plane.rotation.x = Math.PI / 2
plane.position.y +=1

scene.add(plane)
camera.position.z = 5;
cube2.position.x += 2
cube3.position.x -= 4


const directionalLight = new THREE.AmbientLight(0xffffff, 1)
// const light = new THREE.Non()
// directionalLight.position.z = 3
scene.add(directionalLight)

document.getElementById("body").addEventListener("click", async () => {
    document.getElementById("body").requestPointerLock({
        unadjustedMovement: true,
    });
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    var xSpeed = 0.001;
    var ySpeed = 0.0001;
    let speed = 0.001;

    directionalLight.intensity = Math.floor(Math.random() * 10) == 7 ? .1 : 1;

    document.getElementById("body").addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) { // w
            // console.log(camera.rotation)
            camera.translateZ(-speed)
        } else if (keyCode == 83) { // s 
            camera.translateZ(speed)
        } else if (keyCode == 65) { // a
            camera.translateX(- speed)
        } else if (keyCode == 68) { // d
            camera.translateX(speed)
        } else if (keyCode == 32) {
            cube.position.set(0, 0, 0);
        }
    };

    document.getElementById("body").addEventListener("mousemove", (e) => {
        camera.rotation.y -= ((e.movementX) / 30000)
    }, false);
}
animate();