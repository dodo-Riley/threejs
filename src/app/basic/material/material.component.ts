import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
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
    this.setupModelPoints();
    this.setupModelLines();
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

  setupModelPoints() {
    const vertices = [];
    for (let i=0; i<10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(5);
      const y = THREE.MathUtils.randFloatSpread(5);
      const z = THREE.MathUtils.randFloatSpread(5);

      vertices.push(x,y,z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const pearl = new THREE.TextureLoader().load('assets/pearl.png');

    const material = new THREE.PointsMaterial({map: pearl, alphaTest:0.5, color:0xff0000, size:5, sizeAttenuation:false});

    const points = new THREE.Points(geometry, material);

    this.group.add(points)
  }

  setupModelLines() {
    const vertices = [
      -1,1,0,
      1,1,0,
      -1,-1,0,
      1,-1,0
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({color:0xff0000});
    const materialDash = new THREE.LineDashedMaterial({color:0xffff00, dashSize:0.2, gapSize:0.1, scale:1});

    const line = new THREE.Line(geometry, material);
    const lineSeg = new THREE.LineSegments(geometry, material);
    const lineLoop = new THREE.LineLoop(geometry, material);
    const lineDash = new THREE.Line(geometry, materialDash);
    lineDash.computeLineDistances();

    line.position.x = 5;
    lineSeg.position.x = 5;
    lineLoop.position.x = 5;
    lineDash.position.x = 10;

    lineSeg.position.y = -5;
    lineLoop.position.y = 5;

    this.group.add(line);
    this.group.add(lineSeg);
    this.group.add(lineLoop);
    this.group.add(lineDash);

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
