import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {sub} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Component({
  selector: 'app-material3',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class Material3Component implements OnInit,AfterViewInit {
  @ViewChild('container') container: ElementRef;
  public title = 'Material_Texture'
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
    this.setupModelTextureRepeat();
    this.setupModelTextureFilter()
    this.setupModelTextureClampEdge();
    this.setupModelTextureMirror()
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

  setupModelTextureRepeat() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=2;
      texture.repeat.y=2;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    })
    const material = new THREE.MeshStandardMaterial({
      map: map
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

  setupModelTextureFilter() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=1;
      texture.repeat.y=1;

      texture.magFilter = THREE.LinearFilter;
      // texture.minFilter = THREE.NearestFilter; // 가장 가까운 1개 픽셀
      // texture.minFilter = THREE.LinearFilter; // 가장 가까운 4개픽셀 선형 보간
      // texture.minFilter = THREE.NearestMipmapNearestFilter; // 크기가 가장 비슷한 mipmap에서 1개
      // texture.minFilter = THREE.LinearMipmapNearestFilter; // 크기가 가장 비슷한 mipmap에서 4개 선형 보간
      texture.minFilter = THREE.LinearMipmapLinearFilter; // 크기가 가장 비슷한 2개 mipmap에서 각각 4개 선형 보간 가중평균
    })
    const material = new THREE.MeshStandardMaterial({
      map: map
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    box.position.set(-1,0,0);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material);
    sphere.position.set(1,0,0);

    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(sphere);
    subGroup.position.x = -5;
    subGroup.position.y = -2;
    this.group.add(subGroup)
  }

  setupModelTextureClampEdge() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=2;
      texture.repeat.y=2;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    })
    const map2 = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=1;
      texture.repeat.y=1;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.offset.x=0.5;
      texture.offset.y=0.5;
    })
    const map3 = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=1;
      texture.repeat.y=1;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.rotation = THREE.MathUtils.degToRad(45);
      texture.center.x=0;
      texture.center.y=0.5;
    })
    const material = new THREE.MeshStandardMaterial({
      map: map
    })

    const material2 = new THREE.MeshStandardMaterial({
      map: map2
    })
    const material3 = new THREE.MeshStandardMaterial({
      map: map3
    })
    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    box.position.set(-1,0,0);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material);
    sphere.position.set(1,0,0);

    const box2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material2);
    box2.position.set(-1,0,0);
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material2);
    sphere2.position.set(1,0,0);

    const box3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material3);
    box3.position.set(-1,0,0);
    const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material3);
    sphere3.position.set(1,0,0);

    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(sphere);
    subGroup.position.x = 0;

    const subGroup2 = new THREE.Group();
    subGroup2.add(box2);
    subGroup2.add(sphere2);
    subGroup2.position.x = 0;
    subGroup2.position.y = -2;

    const subGroup3 = new THREE.Group();
    subGroup3.add(box3);
    subGroup3.add(sphere3);
    subGroup3.position.x = 0;
    subGroup3.position.y = 2;

    this.group.add(subGroup)
    this.group.add(subGroup2)
    this.group.add(subGroup3)


  };

  setupModelTextureMirror() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('assets/uv_grid.png', texture => {
      texture.repeat.x=2;
      texture.repeat.y=2;
      texture.wrapS = THREE.MirroredRepeatWrapping;
      texture.wrapT = THREE.MirroredRepeatWrapping;
    })
    const material = new THREE.MeshStandardMaterial({
      map: map
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
    box.position.set(-1,0,0);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,32), material);
    sphere.position.set(1,0,0);

    const subGroup = new THREE.Group();
    subGroup.add(box);
    subGroup.add(sphere);
    subGroup.position.x = 5;
    this.group.add(subGroup)
  };


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
