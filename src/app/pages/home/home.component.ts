import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { SessionService } from 'src/app/services/session-service.service';
import ServerModel from 'src/app/models/server-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _servers:ServerModel[];

  get servers(): ServerModel[]{
    return  this._servers;
  }

  constructor(private _serverService: ServerService, private _sessionService: SessionService) 
  {
    this._servers = [];
  }

  ngOnInit() {
    this._servers = this._serverService.list();
  }

}
