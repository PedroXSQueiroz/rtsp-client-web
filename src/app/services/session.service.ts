import { Injectable } from '@angular/core';
import { SessionModel } from '../models/session-model';
import ResourceService from './resource-service';
import { ServerService } from './server.service';
import { StreamModel } from '../models/strema-model';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ResourceService<SessionModel>{
  
  constructor(private _serverService:ServerService) { }
  
  async list(): Promise<SessionModel[]> {
    let servers = this._serverService.list();

    let sessions:SessionModel[] = new Array();

    for(let server of servers){
      let sessionsRequest = new Request(`http://${server.address}:${server.resourcePort}/session`, {
        method: 'GET',
      });

      let sessionRequestResponse = await fetch(sessionsRequest);
      let sessionRequestData = await sessionRequestResponse.json();
      let sessionsFromServer = sessionRequestData.map( data => new SessionModel(data));


      sessions = sessions.concat(sessionsFromServer)
    }

    return sessions;

  }
  
  async add(resource: SessionModel): Promise<SessionModel> {
    
    let createSessionRequest = new Request(`http://${resource.server.address}:${resource.server.resourcePort}/session`, {
      method: 'POST',
      body: JSON.stringify(resource),
      headers:{
        'Content-Type':'application/json'
      }
    });

    let createSessionResponse = await fetch(createSessionRequest);
    let createSessinData = await createSessionResponse.json();
    let session = new SessionModel(createSessinData);

    return session;
  }

  remove(resource: SessionModel) {
    throw new Error("Method not implemented.");
  }

  async start(session: SessionModel) : Promise<StreamModel>{
    
    let sessionStart = new Request(`http://${session.server.address}:${session.server.resourcePort}/session/start`, {
      method: 'POST',
      body: JSON.stringify(session),
      headers: {
        'Content-Type':'application/json'
      }
    });

    let sesionStartResponse = await fetch(sessionStart);
    let streamJson = await sesionStartResponse.json();
    let stream = new StreamModel(streamJson);

    return stream;

  }
}
