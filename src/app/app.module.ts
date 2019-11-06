import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ServersComponent } from './pages/servers/servers.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CamsComponent } from './pages/cams/cams.component';
import { RouterModule } from '@angular/router';
import { routes } from './config/routes';
import { ResourcePageComponent } from './components/resource-page/resource-page.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { SessionsComponent } from './pages/sessions/sessions.component';

// import { routes } from './config/routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    ClientsComponent,
    CamsComponent,
    ResourcePageComponent,
    FormModalComponent,
    SessionsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
