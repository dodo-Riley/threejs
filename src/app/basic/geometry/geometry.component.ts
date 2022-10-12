import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.css']
})

export class GeometryComponent implements OnInit,AfterViewInit {
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
    this.setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupCamera() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    const camera = new THREE.PerspectiveCamera(75,width/height,0.1,2000);
    camera.position.z = 5;
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
    const geometry2 = new THREE.BoxGeometry(1,1,1,2,2,2);
    const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    const cube = new THREE.Mesh(geometry, fillMaterial);
    const cube2 = new THREE.Mesh(geometry2, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line1 = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);
    const line2 = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);
    const line3 = new THREE.LineSegments(geometry, lineMaterial);
    const line4 = new THREE.LineSegments(new THREE.WireframeGeometry(geometry2), lineMaterial);


    cube.position.x=-2;
    line1.position.x=-2;

    line2.position.x=0;
    line3.position.x=2;

    cube2.position.x=-2
    cube2.position.y=-2
    line4.position.x=-2
    line4.position.y=-2

    const group = new THREE.Group();
    group.add(cube);
    group.add(cube2);
    group.add(line1);
    group.add(line2);
    group.add(line3);
    group.add(line4);

    this.scene.add(group);
    this.cube = group;
  }
  setupControls() {
    new OrbitControls(this.camera, this.container.nativeElement);
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
    // time *= 0.001;
    // this.cube.rotation.x = time;
    // this.cube.rotation.y = time;
  }
}
