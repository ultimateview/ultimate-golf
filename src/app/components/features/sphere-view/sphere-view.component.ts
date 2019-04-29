import { Component, OnInit, Input } from '@angular/core';

declare var $: any;
declare var THREE: any;

@Component({
  selector: 'app-sphere-view',
  templateUrl: './sphere-view.component.html',
  styleUrls: ['./sphere-view.component.css']
})
export class SphereViewComponent implements OnInit {

  @Input() containerId: string;

  camera;
  scene;
  renderer;

  texture_placeholder;
  isUserInteracting = false;
  onMouseDownMouseX = 0;
  onMouseDownMouseY = 0;
  lon = 0;
  onMouseDownLon = 0;
  lat = 0;
  onMouseDownLat = 0;
  phi = 0;
  theta = 0;
  distance = 500;
  onPointerDownPointerX;
  onPointerDownPointerY;
  onPointerDownLon;
  onPointerDownLat;


  constructor() { }

  ngOnInit() {
    const me = this;
    setTimeout(function() {
      me.init();
      me.animate();
    }, 1);
  }

  init() {
    let container, mesh;
    container = $('#' + this.containerId).get(0);
    // console.log('here');
    // console.log(container);

    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera = new THREE.PerspectiveCamera(75, 5 / 4, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.scene = new THREE.Scene();
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const video = document.createElement('video');
    // const video = $('#' + this.containerId + ' video').get(0);
    video.width = 640;
    video.height = 360;
    video.setAttribute('crossorigin', 'anonymous');
    video.autoplay = true;
    video.loop = true;

    // video.src = "https://threejs.org/examples/textures/pano.webm";
    // video.src = 'https://s3-eu-west-1.amazonaws.com/ireland-video-output/videos/pan/TahitiSurf360.mp4';
    // video.src = 'assets/panos/VID_20190408_154947AA.MP4';
    // video.src = 'assets/panos/TahitiSurf360.mp4';
    video.src = 'assets/panos/VID_20190408_154947AA_77541875-eqy.MP4';
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.renderer = new THREE.WebGLRenderer();
    console.log('window.devicePixelRatio: ');
    console.log(window.devicePixelRatio);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(1280, 720);
    // this.renderer.setSize(640, 360);
    container.appendChild(this.renderer.domElement);
    console.log('doc');
    console.log(document);
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('mouseup', this.onDocumentMouseUp, false);
    // document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
    // document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize() {
    console.log(this.camera);
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  onDocumentMouseDown(event) {
    console.log('DOWN');
    event.preventDefault();
    this.isUserInteracting = true;

    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
  }

  onDocumentMouseMove(event) {
    if (this.isUserInteracting === true) {
      console.log('moving: ');
      this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon;
      this.lat = (event.clientY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;
    }
  }

  onDocumentMouseUp(event) {
    this.isUserInteracting = false;
  }

  onDocumentMouseWheel(event) {
    // WebKit
    if (event.wheelDeltaY) {
      this.distance -= event.wheelDeltaY * 0.05;
      // Opera / Explorer 9
    } else if (event.wheelDelta) {
      this.distance -= event.wheelDelta * 0.05;
      // Firefox
    } else if (event.detail) {
      this.distance += event.detail * 1.0;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.update();
  }

  update() {
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);
    this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
    // this.camera.position.x += 500;
    this.camera.position.y = this.distance * Math.cos(this.phi);
    this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
    // this.camera.position.z = 0;
    this.camera.rotateOnAxis(this.camera.position, 10);
    this.camera.lookAt(this.camera.target);
    // distortion
    // camera.position.copy( camera.target ).negate();
    this.renderer.render(this.scene, this.camera);
  }

}
