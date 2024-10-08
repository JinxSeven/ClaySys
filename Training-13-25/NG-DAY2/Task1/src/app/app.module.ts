import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, WeatherComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}
