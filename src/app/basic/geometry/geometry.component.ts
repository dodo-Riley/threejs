import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {GeometryService} from "./geometry.service";

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
  public group = new THREE.Group();
  constructor( public geo : GeometryService ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.nativeElement.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;

    this.camera = this.geo.setupCamera(this.container);
    this.geo.setupLight(this.scene);
    this.setupModelBox();
    this.setupModelCircle();
    this.setupModelCone();
    this.setupModelCylinder();
    this.setupModelSphere();
    this.setupModelRing();
    this.setupModelPlane();
    this.setupModelTorus();
    this.setupModelTorusKnot();
    this.scene.add(this.group);
    this.cube = this.group;
    this.geo.setupControls(this.camera,this.container);

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupModelBox() {
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y=2;

    this.group.add(subgroup);
  }

  setupModelCircle() {
    const geometry = new THREE.CircleGeometry();
    const geometry2 = new THREE.CircleGeometry(1,20,0,Math.PI/2);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = 0;

    this.group.add(subgroup);
  }

  setupModelCone() {
    const geometry = new THREE.ConeGeometry();
    const geometry2 = new THREE.ConeGeometry(1,0.5,20,3,true,0,Math.PI/2*3);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = -2;

    this.group.add(subgroup);
  }

  setupModelCylinder() {
    const geometry = new THREE.CylinderGeometry();
    const geometry2 = new THREE.CylinderGeometry(0.5,1,0.5,20,3,true,0,Math.PI*2);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = 4;

    this.group.add(subgroup);
  }

  setupModelSphere() {
    const geometry = new THREE.SphereGeometry();
    const geometry2 = new THREE.SphereGeometry(0.5,10,3,0,Math.PI,0,Math.PI/2);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = -4;

    this.group.add(subgroup);
  }

  setupModelRing() {
    const geometry = new THREE.RingGeometry();
    const geometry2 = new THREE.RingGeometry(0.2,1,20,5,0,Math.PI);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = 6;

    this.group.add(subgroup);
  }

  setupModelPlane() {
    const geometry = new THREE.PlaneGeometry();
    const geometry2 = new THREE.PlaneGeometry(0.5,0.8,10,5);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = -6;

    this.group.add(subgroup);
  }

  setupModelTorus() {
    const geometry = new THREE.TorusGeometry();
    const geometry2 = new THREE.TorusGeometry(0.5,0.2,20,10, Math.PI);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = 8;

    this.group.add(subgroup);
  }

  setupModelTorusKnot() {
    const geometry = new THREE.TorusKnotGeometry();
    const geometry2 = new THREE.TorusKnotGeometry(0.5,0.2,20,10,3,5);
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

    cube2.position.x=4;
    line4.position.x=4;

    const subgroup = new THREE.Group();
    subgroup.add(cube);
    subgroup.add(cube2);
    subgroup.add(line1);
    subgroup.add(line2);
    subgroup.add(line3);
    subgroup.add(line4);
    subgroup.position.y = -8;

    this.group.add(subgroup);
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
