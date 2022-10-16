import {ElementRef, Injectable} from '@angular/core';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  constructor() { }

  setupCamera(container:ElementRef) {
    const width = container.nativeElement.clientWidth;
    const height = container.nativeElement.clientHeight;
    const camera = new THREE.PerspectiveCamera(50,width/height,0.1,2000);
    camera.position.z = 25;
    return camera
  }

  setupLight(scene:THREE.Scene) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4);
    scene.add(light);
  }

  setupControls(camera:THREE.Camera, container:ElementRef) {
    new OrbitControls(camera, container.nativeElement);
  }
}
