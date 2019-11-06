import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ClientService } from 'src/app/services/client.service';
import { CameraService } from 'src/app/services/camera.service';
import { SessionService } from 'src/app/services/session.service';
import { SessionModel } from 'src/app/models/session-model';
import { FormModalComponent } from 'src/app/components/form-modal/form-modal.component';
import ServerModel from 'src/app/models/server-model';
import { ClientModel } from 'src/app/models/client-model';
import CamModel from 'src/app/models/cam-model';

import JSMpeg from 'jsmpeg';
import { StreamModel } from 'src/app/models/strema-model';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  @ViewChild(FormModalComponent, { static: false }) form: FormModalComponent;
  @ViewChild('videoCanvas', {static: false}) videoCanvas: ElementRef;
  
  private _sessions: SessionModel[];

  get sessions(): SessionModel[] {
    return this._sessions;
  }

  private _servers :ServerModel[];

  get servers():ServerModel[] 
  {
    return this._servers;
  }

  private _clients:ClientModel[];

  get clients(): ClientModel[] {
    
    if(!this._currentSession.server)
    {
      return [];
    }
    
    return this._clients.filter( client => client.server.id == this._currentSession.server.id );
  }

  private _cameras: CamModel[];

  get cameras(): CamModel[] {
    
    if(!this._currentSession.client)
    {
      return [];
    }
    
    return this._cameras.filter( camera => camera.client.id == this._currentSession.client.id );
  }

  private _isVideoCanvasVisible:boolean;

  get isVideoCanvasVisible():boolean{
    return this._isVideoCanvasVisible;
  }

  private _currentSession:SessionModel;

  get currentSession():SessionModel
  {
    return this._currentSession;
  }

  set currentSession(session:SessionModel)
  {
    this._currentSession = session;
  }

  constructor(
    private _serverService: ServerService,
    private _clientService: ClientService,
    private _camerService: CameraService,
    private _sessionService: SessionService) { }


  async ngOnInit() {

    this.loadSessions();
    this._currentSession = new SessionModel();
    this._servers = this._serverService.list();
    this._clients = await this._clientService.list();
    this._cameras = await this._camerService.list();

  }
  
  async loadSessions() 
  {
    this._sessions = await this._sessionService.list();
  }

  add() {
    this.form.isVisible = true;
  }

  async save(){
    this._sessionService.add(this._currentSession);
    this.loadSessions();
  }

  async startSession(session:SessionModel){
    this._isVideoCanvasVisible = true;

    let videoCanvas = this.videoCanvas;

    let stream = await this._sessionService.start(session);
    
    new JSMpeg(stream.url, videoCanvas.nativeElement);
  }

}
