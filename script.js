import './style.css';
import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
 
renderer.setSize( window.innerWidth , window.innerHeight );
requestAnimationFrame( animate);
renderer.render(scene , camera );

renderer.setSize(window.innerWidth , window.innerHeight);

const geometry = new THREE.SphereGeometry(4 , 18 , 9 );

const texture = new THREE.TextureLoader().load('jawa.jpg')

const material = new THREE.MeshBasicMaterial({ map: texture});
const sphere = new THREE.Mesh(geometry,material);
sphere.scale.set(4,3,1);
scene.add ( sphere );

const round_geo = new THREE.TorusGeometry(25,3,15,200);
const roundM = new THREE.PointsMaterial({color: 'red' , size: 0.3});
const round = new THREE.Points(round_geo , roundM);

scene.add(round);

camera.position.z = 50;
function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
   round.rotation.x += 0.01;
    round.rotation.y  += 0.01;

    renderer.render( scene , camera );
}

animate();
