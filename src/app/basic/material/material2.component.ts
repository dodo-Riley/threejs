import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {sub} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Component({
  selector: 'app-material2',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class Material2Component implements OnInit,AfterViewInit {
  @ViewChild('container') container: ElementRef;
  public title = 'Material_MeshBasic,MeshLambert,MeshPhong,MeshStandard,MeshPhysical'
  public renderer:any;
  public scene:any;
  public camera:any;
  public group=new THREE.Group;

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
    this.setupModelMeshBasic();
    this.setupModelMeshLambert();
    this.setupModelMeshPhong();
    this.setupModelMeshStandard();
    this.setupModelMeshPhysical();
    this.scene.add(this.group);
    this.setupControl();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupCamera() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    const camera = new THREE.PerspectiveCamera(75,width/height,0.1,100);
    camera.position.z = 7;
    this.camera = camera;
  }

  setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4);
    this.scene.add(light);
  }

  setupModelMeshBasic() {
    const material = new THREE.MeshBasicMaterial({
      color:0xffffff,
      wireframe:false,
      visible:true,
      transparent:false,
      opacity:1,
      depthTest:true,
      depthWrite:true,
      side:THREE.FrontSide
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    box.position.set(-1,0,0);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material);
    sphere.position.set(1,0,0);

    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(sphere);
    subGroup.position.x = -5;
    this.group.add(subGroup)
  }

  setupModelMeshLambert() {
    const material = new THREE.MeshLambertMaterial({
      color:0xffffff,
      wireframe:false,
      emissive:0x000000,
      visible:true,
      transparent:true,
      opacity:0.5,
      side:THREE.FrontSide
    })

    const material2 = new THREE.MeshLambertMaterial({
      color: 'red',
      wireframe: false,
      emissive: 'yellow',
      visible:true,
      transparent:true,
      opacity:0.5,
      side:THREE.BackSide
    })

    const material3 = new THREE.MeshLambertMaterial({
      color:'blue',
      wireframe:false,
      emissive:0x000000,
      visible:true,
      transparent:true,
      opacity:0.5,
      side:THREE.DoubleSide
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    const box2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material2);
    const box3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material3);

    box.position.y=2;
    box3.position.y=-2;
    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(box2);
    subGroup.add(box3);
    subGroup.position.x=-1;
    this.group.add(subGroup)
  }

  setupModelMeshPhong() {
    const material = new THREE.MeshPhongMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      specular: 0xffff00,
      shininess:0,
      flatShading:false
    })

    const material2 = new THREE.MeshPhongMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      specular: 0xffff00,
      shininess:10,
      flatShading:false
    })

    const material3 = new THREE.MeshPhongMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      specular: 0xffff00,
      shininess:10,
      flatShading:true
   })

    const box = new THREE.Mesh(new THREE.SphereGeometry(1,32,32),material);
    const box2 = new THREE.Mesh(new THREE.SphereGeometry(1,32,32),material2);
    const box3 = new THREE.Mesh(new THREE.SphereGeometry(1,32,32),material3);

    box.position.y=2;
    box3.position.y=-2;
    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(box2);
    subGroup.add(box3);
    subGroup.position.x = 2

    this.group.add(subGroup)
  }

  setupModelMeshStandard() {
    const material = new THREE.MeshStandardMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:0.25,
      metalness:0.1,
      flatShading:false
    })

    const material2 = new THREE.MeshStandardMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:0.8,
      metalness:0.1,
      flatShading:false
    })

    const material3 = new THREE.MeshStandardMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:0.25,
      metalness:0.8,
      flatShading:false
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    const box2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material2);
    const box3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material3);

    box.position.y=2;
    box3.position.y=-2;
    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(box2);
    subGroup.add(box3);
    subGroup.position.x = 5

    this.group.add(subGroup)
  }

  setupModelMeshPhysical() {
    const material = new THREE.MeshPhysicalMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:1,
      metalness:0.1,
      flatShading:false,
      clearcoat:1,
      clearcoatRoughness:0
    })

    const material2 = new THREE.MeshPhysicalMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:0.25,
      metalness:0.1,
      flatShading:false,
      clearcoat:0.5,
      clearcoatRoughness:0
    })

    const material3 = new THREE.MeshPhysicalMaterial({
      color:0xff0000,
      wireframe:false,
      emissive:0x000000,
      roughness:0.25,
      metalness:0.1,
      flatShading:false,
      clearcoat:1,
      clearcoatRoughness:0.5
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    const box2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material2);
    const box3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material3);

    box.position.y=2;
    box3.position.y=-2;
    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(box2);
    subGroup.add(box3);
    subGroup.position.x = 8

    this.group.add(subGroup)
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
    // this.cube.rotation.x = time;
    // this.cube.rotation.y = time;
  }

  setupControl() {
    new OrbitControls(this.camera, this.container.nativeElement);
  }
}
