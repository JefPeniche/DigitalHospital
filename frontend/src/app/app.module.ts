import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-MX" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
