import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModalComponent } from 'src/app/components/form-modal/form-modal.component';
import ServerModel from 'src/app/models/server-model';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  @ViewChild(FormModalComponent, {static: false}) form:FormModalComponent;

  private _currentServer:ServerModel;

  get currentServer():ServerModel
  {
    return this._currentServer;
  }

  set currentServer(server:ServerModel)
  {
    this._currentServer = server;
  }

  private _servers:ServerModel[];

  get servers():ServerModel[]
  {
    return this._servers;
  }
  
  constructor(private _serverService: ServerService) 
  {
  }

  ngOnInit() {
    this._currentServer = new ServerModel();
    this.loadServers();
  }

  private loadServers() {
    this._servers = this._serverService.list();
  }

  add()
  {
    this.form.isVisible = true;
  }

  async remove(server:ServerModel)
  {
    await this._serverService.remove(server);
    this.loadServers();
  }

  async save()
  {
    await this._serverService.add(this._currentServer);
    this.loadServers();
  }

}
