import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ServersComponent } from '../pages/servers/servers.component';
import { ClientsComponent } from '../pages/clients/clients.component';
import { CamsComponent } from '../pages/cams/cams.component';
import { ResourcePageComponent } from '../components/resource-page/resource-page.component';
import { SessionsComponent } from '../pages/sessions/sessions.component';

export const routes:Routes = [
    { path: '', component: HomeComponent, data: {name: 'Home'} },
    { 
        path: 'res', 
        component: ResourcePageComponent, 
        children:[
            { path: 'servers', component: ServersComponent, data: {name: 'Servidores'} },
            { path: 'clients', component: ClientsComponent, data: {name: 'Clientes'} },
            { path: 'cams', component: CamsComponent, data: {name: 'Câmeras'} },
            { path: 'sessions', component: SessionsComponent, data: {name: 'Sessões'} }
        ]
    },
]