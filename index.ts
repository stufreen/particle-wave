import randomNormal from 'random-normal';
import { Scene, Renderer, Camera, Geometry, BoxGeometry, Object3D } from 'three';

const THREE = require('three');

const spriteMap = new THREE.TextureLoader().load('particle.png');
const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });

const NUM_PARTICLES = 500;
const PARTICLE_SIZE = 0.6;
const SPEED = 20000;

interface Particle {
  duration: number,
  amplitude: number,
  offsetY: number,
  arc: number,
  startTime: number,
  z: number,
  geometry: Object3D,
};

let particles: Particle[] = [];

function rand(low: number, high: number) {
  return Math.random() * (high - low) + low;
}

function createParticle(scene: Scene) {
  const color = new THREE.Color(
    1,
    randomNormal({ mean: 0.5, dev: 0.08 }),
    0.3
  );
  const size = randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 3 })
  // const geometry = new THREE.SphereGeometry(size, 32, 32);
  // const material = new THREE.MeshPhongMaterial({
  //   color,
  //   opacity: randomNormal({ mean: 0.9, dev: 0.2 }),
  //   transparent: true,
  // });

  const geometry = new THREE.CircleGeometry(size, 16);
  const material = new THREE.MeshBasicMaterial({
    color,
    opacity: randomNormal({ mean: 0.7, dev: 0.2 }),
    transparent: true,
  });
  const circle = new THREE.Mesh(geometry, material);
  scene.add(circle);

  // const sprite = new THREE.Sprite(spriteMaterial);
  // sprite.scale.set(size, size, size);
  // scene.add(sprite);

  return {
    duration: randomNormal({ mean: SPEED, dev: SPEED / 10 }),
    amplitude: randomNormal({ mean: 50, dev: 8 }),
    offsetY: randomNormal({ mean: 0, dev: 10 }),
    arc: randomNormal({ mean: Math.PI * 2, dev: 0.1 }),
    startTime: performance.now() - rand(0, SPEED),
    z: randomNormal({ mean: 0, dev: 5 }),
    geometry: circle,
  }
}

function moveParticle(particle: Particle, time: number) {
  const x = ((time - particle.startTime) % particle.duration) / particle.duration;
  const y = (Math.sin(x * particle.arc) * particle.amplitude) + particle.offsetY;

  particle.geometry.position.set(x * 350 - 175, y, particle.z);
}

function draw(time: number, scene: Scene, camera: Camera, renderer: Renderer) {
  // Move particles
  for (let i = 0; i < particles.length; i++) {
    moveParticle(particles[i], time);
  }

  renderer.render(scene, camera);

  // Schedule next frame
  requestAnimationFrame((time) => draw(time, scene, camera, renderer));
}

function initializeCanvas(): [Scene, Camera, Renderer] {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 100;

  return [scene, camera, renderer];
}

function startAnimation() {
  const [scene, camera, renderer] = initializeCanvas();

  // Create a bunch of particles
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(createParticle(scene));
  }

  requestAnimationFrame((time) => draw(time, scene, camera, renderer));
};

// Start animation when document is loaded
(function () {
  if (document.readyState !== 'loading') {
    startAnimation();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      startAnimation();
    })
  }
}());
