import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubCardComponent } from './github-card/github-card.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { GithubInfoComponent } from './github-info/github-info.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubCardComponent,
    ErrorComponent,
    GithubInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
