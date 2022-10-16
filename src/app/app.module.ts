import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstComponent } from './basic/first/first.component';
import {GeometryComponent} from './basic/geometry/geometry.component';
import {Geometry2Component} from './basic/geometry/geometry2.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    GeometryComponent,
    Geometry2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
