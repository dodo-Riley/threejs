import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit,AfterViewInit {
  @ViewChild('container') container: ElementRef;
  public renderer:any;
  public scene:any;
  public camera:any;
  public cube:any;
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

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupCamera() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    const camera = new THREE.PerspectiveCamera(75,width/height,0.1,100);
    camera.position.z = 2;
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
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshPhongMaterial({color:0x44a88});
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.cube = cube;
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
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
  }
}
