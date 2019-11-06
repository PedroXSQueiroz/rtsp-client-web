import { Injectable } from '@angular/core';
import ResourceService from './resource-service';
import CamModel from '../models/cam-model';
import { ClientService } from './client.service';
import { ClientModel } from '../models/client-model';

@Injectable({
  providedIn: 'root'
})
export class CameraService implements ResourceService<CamModel> {

  constructor(private _clientService:ClientService) 
  { 

  }
  
  async list(): Promise<CamModel[]> {
    
    let clients: ClientModel[] = await this._clientService.list();

    let cameras:CamModel[] = new Array();

    for(let client of clients)
    {
      let camsFromClientRequest = new Request(`http://${client.address}:${client.resourcePort}/cam`, {
        method: 'GET'
      });

      let camsFromClientResponse = await fetch(camsFromClientRequest);
      let camsFromClientData = await camsFromClientResponse.json();
      let camsFromClient = camsFromClientData.map(data => new CamModel(data));

      cameras = cameras.concat(camsFromClient);

    }

    return cameras;

  }
  async add(resource: CamModel): Promise<CamModel> {
    
    let addCameraRequest = new Request(`http://${resource.client.address}:${resource.client.resourcePort}/cam`, {
      method: 'POST',
      body: JSON.stringify(resource),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let requestResponse = await fetch(addCameraRequest);
    let cameraData = await requestResponse.json();
    return new CamModel(cameraData);

  }
  remove(resource: CamModel) {
    throw new Error("Method not implemented.");
  }
}
