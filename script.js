import './style.css';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
 
renderer.setSize( window.innerWidth , window.innerHeight );

renderer.setPixelRatio( window.devicePixelRatio);

const geometry = new THREE.SphereGeometry(4 , 18 , 9 );

const texture = new THREE.TextureLoader().load('jawa.jpg');

const material = new THREE.MeshBasicMaterial({ map: texture});

const sphere = new THREE.Mesh(geometry,material);
sphere.scale.set(4,3,1);
sphere.position.set(-60,20,0)
scene.add ( sphere );

const round_geo = new THREE.TorusGeometry(25,3,15,200);
const roundM = new THREE.PointsMaterial({color: 'red' , size: 0.3});
const round = new THREE.Points(round_geo , roundM);
round.position.set(1,80,1)
scene.add(round);
 


const directionalLight = new THREE.DirectionalLight(0xffffff , 2);
directionalLight.position.set(50,50,50);
scene.add(directionalLight);
let bike;

const loader = new FBXLoader();
loader.load('/bike.fbx',(fbx)=>{
    bike = fbx;
    fbx.scale.set(10,10,10);
    bike.position.set(-300,-40,0);
    scene.add(fbx);
})

camera.position.z = 150;

function moveCamera() {
    const t =  document.body.getBoundingClientRect().top;

    round.rotation.y  += 0.01;
    round.rotation.z  += 0.01;
    if (bike) {
        bike.position.x =-300
    }
    camera.position.x = t* -0.1000;
    camera.position.y = t* -0.2000;

}
  
document.body.onscroll = moveCamera;
moveCamera();

  
function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    round.rotation.x += 0.01;
    round.rotation.y  += 0.01;
if(bike) {
    bike.rotation.y += 0.002;

}
  
    renderer.render( scene , camera );
}

animate();
