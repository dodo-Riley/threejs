import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-scenegraph',
  templateUrl: './scenegraph.component.html',
  styleUrls: ['./scenegraph.component.css']
})
export class ScenegraphComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  public renderer:any;
  public scene:any;
  public camera:any;
  public cube:any;
  public solarSystem:THREE.Object3D;
  public earthOrbit:THREE.Object3D;
  public moonOrbit:THREE.Object3D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.nativeElement.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;

    this.setupCamera();
    this.setupLight();
    this.setupModel();
    this.setupControls(this.camera, this.container);

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupCamera() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    const camera = new THREE.PerspectiveCamera(75,width/height,0.1,100);
    camera.position.z = 25;
    this.camera = camera;
  }

  setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4);
    this.scene.add(light);
  }

  setupModel() {
    const solarSystem = new THREE.Object3D();
    this.scene.add(solarSystem);

    const radius = 1;
    const widthSegments = 12;
    const heightSegments = 12;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    const sunMaterial = new THREE.MeshPhongMaterial({emissive:0xffff00, flatShading:true});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(3,3,3);
    solarSystem.add(sunMesh);

    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);
    const earthMaterial = new THREE.MeshPhongMaterial({color:0x2233ff, emissive:0x112244, flatShading:true});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.position.x=10;
    earthOrbit.add(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x=2;
    earthOrbit.add(moonOrbit);
    const moonMaterial = new THREE.MeshPhongMaterial({color:0x888888, emissive:0x222222, flatShading:true});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5,0.5,0.5);
    moonOrbit.add(moonMesh);

    this.solarSystem = solarSystem;
    this.earthOrbit = earthOrbit;
    this.moonOrbit = moonOrbit;
  }

  resize() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width,height);
  }

  render(time:number) {
    this.renderer.render(this.scene, this.camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time:number) {
    time *= 0.001;
    this.solarSystem.rotation.y = time / 2;
    this.earthOrbit.rotation.y = time * 2;
    this.moonOrbit.rotation.y = time * 5;
  }

  setupControls(camera:THREE.Camera, container:ElementRef) {
    new OrbitControls(camera, container.nativeElement);
  }
}
