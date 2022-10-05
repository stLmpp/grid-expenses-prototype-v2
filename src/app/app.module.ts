import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GridControlComponent } from './grid-control/grid-control.component';

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, GridControlComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatSnackBarModule,
    MatButtonModule,
    ApiModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
