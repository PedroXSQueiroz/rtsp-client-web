import { Injectable } from '@angular/core';
import ResourceService from './resource-service';
import { ClientModel } from '../models/client-model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements ResourceService<ClientModel> {
  
  constructor(private _serverService:ServerService) 
  {

  }
  
  async list(): Promise<ClientModel[]> {
    
    let servers = this._serverService.list();

    let clients = [];

    for(let server of servers)
    {
      let clientsRequest = new Request(`http://${server.address}:${server.resourcePort}/client`, {
        method: 'GET'
      });

      let clientsFromServerDataJson = await fetch(clientsRequest);
      let clientsFromServerData = await clientsFromServerDataJson.json();
      let clientsFromServer = clientsFromServerData.map( data => new ClientModel(data, server));

      clients = clients.concat(clientsFromServer);
    }

    return clients;
  }
  
  async add(resource: ClientModel): Promise<ClientModel> {

    let registerSeverOnClientRequest = new Request(`http://${resource.address}:${resource.resourcePort}/server`, {
      method: 'POST',
      body: JSON.stringify(resource.server),
      headers: {
        'Content-Type':'application/json'
      }
    });

    let client = await fetch(registerSeverOnClientRequest);

    return new ClientModel(client);
  }
  
  remove(resource: ClientModel) {
    throw new Error("Method not implemented.");
  }
}
