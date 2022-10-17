import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {GeometryService} from "./geometry.service";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

@Component({
  selector: 'app-geometry2',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.css']
})

export class Geometry2Component implements OnInit,AfterViewInit {
  @ViewChild('container') container: ElementRef;
  public renderer:any;
  public scene:any;
  public camera:any;
  public cube:any;
  public group = new THREE.Group();
  public scale:number;
  public font:any;
  constructor( public geo : GeometryService ) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.nativeElement.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;

    this.camera = this.geo.setupCamera(this.container);
    this.geo.setupLight(this.scene);
    this.setupModelShape();
    this.setupModelHeartShape();
    this.setupModelHeart();
    this.setupModelCurve();
    this.setupModelTube();
    this.setupModelLineForLathe();
    this.setupModelLathe();
    this.setupModelExtrude();
    this.setupModelFont();
    this.scene.add(this.group);
    this.cube = this.group;
    this.geo.setupControls(this.camera,this.container);
    this.camera.position.z = 50;

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupModelShape() {
    const shape = new THREE.Shape();
    shape.moveTo(1,1);
    shape.lineTo(1,-1);
    shape.lineTo(-1,-1);
    shape.lineTo(-1,1);
    shape.closePath();

    const geometry = new THREE.BufferGeometry();
    const points = shape.getPoints();
    geometry.setFromPoints(points);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.Line(geometry, lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(line);

    this.group.add(subgroup);
  }

  setupModelHeartShape() {
    const shape = new THREE.Shape();
    const x = -2.5, y=-5;
    shape.moveTo(x+2.5,y+2.5);
    shape.bezierCurveTo(x+2.5,y+2.5,x+2,y,x,y);
    shape.bezierCurveTo(x-3,y,x-3,y+3.5,x-3,y+3.5);
    shape.bezierCurveTo(x-3,y+5.5,x-1.5,y+7.7,x+2.5,y+9.5);
    shape.bezierCurveTo(x+6,y+7.7,x+8,y+4.5,x+8,y+3.5);
    shape.bezierCurveTo(x+8,y+3.5,x+8,y,x+5,y);
    shape.bezierCurveTo(x+3.5,y,x+2.5,y+2.5,x+2.5,y+2.5);

    const geometry = new THREE.BufferGeometry();
    const points = shape.getPoints();
    geometry.setFromPoints(points);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.Line(geometry, lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(line);

    this.group.add(subgroup);
  }

  setupModelHeart() {
    const shape = new THREE.Shape();
    const x = -2.5, y=-5;
    shape.moveTo(x+2.5,y+2.5);
    shape.bezierCurveTo(x+2.5,y+2.5,x+2,y,x,y);
    shape.bezierCurveTo(x-3,y,x-3,y+3.5,x-3,y+3.5);
    shape.bezierCurveTo(x-3,y+5.5,x-1.5,y+7.7,x+2.5,y+9.5);
    shape.bezierCurveTo(x+6,y+7.7,x+8,y+4.5,x+8,y+3.5);
    shape.bezierCurveTo(x+8,y+3.5,x+8,y,x+5,y);
    shape.bezierCurveTo(x+3.5,y,x+2.5,y+2.5,x+2.5,y+2.5);

    const geometry = new THREE.ShapeGeometry(shape);
    const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(line);
    subgroup.position.x = 15;

    this.group.add(subgroup);
  }

  setupModelCurve() {
    class CustomSinCurve extends THREE.Curve<any> {
      private scale: number;
      constructor(scale:number) {
        super();
        this.scale = scale;
      }

      override getPoint(t:number) {
        const tx = t*3-1.5;
        const ty = Math.sin(2*Math.PI*t);
        const tz = 0;
        return new THREE.Vector3(tx,ty,tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);

    const geometry = new THREE.BufferGeometry();
    const points = path.getPoints(10);
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.Line(geometry,material);

    const subgroup = new THREE.Group();
    subgroup.add(line);
    subgroup.position.y = -15;

    this.group.add(subgroup);
  }

  setupModelTube() {
    class CustomSinCurve extends THREE.Curve<any> {
      private scale: number;
      constructor(scale:number) {
        super();
        this.scale = scale;
      }

      override getPoint(t:number) {
        const tx = t*3-1.5;
        const ty = Math.sin(2*Math.PI*t);
        const tz = 0;
        return new THREE.Vector3(tx,ty,tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const geometry = new THREE.TubeGeometry(path, 40, 0.5, 10, true);
    const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(line);
    subgroup.position.x = 15;
    subgroup.position.y = -15;

    this.group.add(subgroup);
  }

  setupModelLineForLathe() {
    const points = [];
    for (let i = 0; i<10; i++) {
      points.push(new THREE.Vector2(Math.sin(i*0.2)*3+3,(i-5)*0.8))
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.Line(geometry,material);

    const subgroup = new THREE.Group();
    subgroup.add(line);
    subgroup.position.y = -30;

    this.group.add(subgroup);
  }

  setupModelLathe() {
    const points = [];
    for (let i = 0; i<10; i++) {
      points.push(new THREE.Vector2(Math.sin(i*0.2)*3+3,(i-5)*0.8))
    }

    const geometry = new THREE.LatheGeometry(points,20,0,Math.PI);
    const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(line);
    subgroup.position.x = 15;
    subgroup.position.y = -30;

    this.group.add(subgroup);
  }

  setupModelExtrude() {
    const shape = new THREE.Shape();
    const x = -2.5, y=-5;
    shape.moveTo(x+2.5,y+2.5);
    shape.bezierCurveTo(x+2.5,y+2.5,x+2,y,x,y);
    shape.bezierCurveTo(x-3,y,x-3,y+3.5,x-3,y+3.5);
    shape.bezierCurveTo(x-3,y+5.5,x-1.5,y+7.7,x+2.5,y+9.5);
    shape.bezierCurveTo(x+6,y+7.7,x+8,y+4.5,x+8,y+3.5);
    shape.bezierCurveTo(x+8,y+3.5,x+8,y,x+5,y);
    shape.bezierCurveTo(x+3.5,y,x+2.5,y+2.5,x+2.5,y+2.5);

    const settings = {
      steps:2,
      depth:4,
      bevelEnabled:true,
      bevelThickness:1.6,
      bevelSize:1.5,
      bevelSegments:10
    }
    const geometry = new THREE.ExtrudeGeometry(shape,settings);
    const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(line);
    subgroup.position.x = 30;

    this.group.add(subgroup);
  }

  setupModelFont() {
    const loader = new FontLoader();
    loader.load('/assets/NotoSansKRRegular.json', (font) => {
      debugger;
      const geometry = new TextGeometry('가', {
        font: font,
        size:10,
        height:1.5,
        curveSegments:4,
        bevelEnabled:true,
        bevelThickness:0.7,
        bevelSize:0.7,
        bevelSegments:2
      })
      const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
      const cube = new THREE.Mesh(geometry, fillMaterial);

      const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
      const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

      const subgroup = new THREE.Group();
      subgroup.add(cube);
      subgroup.add(line);
      subgroup.position.y = 15;

      this.group.add(subgroup);
    })


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
