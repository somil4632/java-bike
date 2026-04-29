import './style.css';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
scene.background = new THREE.TextureLoader().load('/Backg.png')
renderer.setSize( window.innerWidth , window.innerHeight );

renderer.setPixelRatio( window.devicePixelRatio);

const geometry = new THREE.SphereGeometry(8 , 32 , 32 );
const texture = new THREE.TextureLoader().load('jawa.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture});
const sphere = new THREE.Mesh(geometry,material);
sphere.scale.set(6,4,1);
sphere.position.set(1,-2,1)
scene.add ( sphere );

const round_geo = new THREE.TorusGeometry(60,6,15,200);
const roundM = new THREE.PointsMaterial({color: 'black' , size: 1.5});
const round = new THREE.Points(round_geo , roundM);
round.position.set(1,-2,1);
scene.add(round);
 


const directionalLight = new THREE.DirectionalLight(0xffffff , 2);
directionalLight.position.set(50,50,50);
scene.add(directionalLight);
let bike;

const loader = new FBXLoader();
loader.load('/bike.fbx',(fbx)=>{
    bike = fbx;
    fbx.scale.set(10,10,10);
    bike.position.set(-500,-70,-40);
    scene.add(fbx);
})

camera.position.z = 150;

const sY = 1;
const rY = 1;
const bY = -500;

function moveCamera() {
    const srollT = window.scrollY;

    round.position.x  = sY + srollT * 0.1;
    sphere.position.x = rY + srollT * 0.1;
    bike.position.x = bY + srollT * 0.30;
   
}
window.addEventListener('scroll',moveCamera);



  
function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    round.rotation.x += 0.01;
    round.rotation.y  += 0.01;
if(bike) {
    bike.rotation.y += 0.01;

}
  
    renderer.render( scene , camera );
}

animate();
