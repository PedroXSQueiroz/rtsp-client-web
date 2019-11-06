import { Injectable } from '@angular/core';
import ResourceService from './resource-service';
import ServerModel from '../models/server-model';
import uuid from 'uuid/v4';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService implements ResourceService<ServerModel> {
  
  constructor(private httpClient: HttpClient)
  {
  }

  private persistServers(servers: ServerModel[]) {
    let serversData = JSON.stringify(servers);
    localStorage.setItem('servers', serversData);
  }

  async add(resource: ServerModel): Promise<ServerModel> {
    
    
    let currentServer:ServerModel = await this.httpClient.get<ServerModel>(`http://${resource.address}:${resource.resourcePort}/server/this`).toPromise();
    
    let id = uuid();
    currentServer.id = id;
    
    let servers:ServerModel[] = this.list();
    servers.push(currentServer);
    
    this.persistServers(servers);

    return currentServer;
  }
  
  list(): ServerModel[] {
    
    let serversDataJson = localStorage.getItem('servers');

    if(!serversDataJson)
    {
      return [];
    }
    
    let servers = JSON.parse(serversDataJson).map( serverData => {
      return new ServerModel(serverData); 
    })

    return servers;
  }

  remove(server: ServerModel) {
    
    let servers:ServerModel[] = this.list();

    let serverIndex = servers.findIndex(currentServer => server.id == currentServer.id);
    servers.splice(serverIndex, 1);

    this.persistServers(servers);
  }
}
