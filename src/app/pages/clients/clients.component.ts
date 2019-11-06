import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';
import { FormModalComponent } from 'src/app/components/form-modal/form-modal.component';
import { ServerService } from 'src/app/services/server.service';
import ServerModel from 'src/app/models/server-model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild(FormModalComponent, {static: false}) form:FormModalComponent;

  private _currentClient:ClientModel;

  get currentClient():ClientModel
  {
    return this._currentClient;
  }

  set currentClient(client:ClientModel)
  {
    this._currentClient = client;
  }

  private _clients:ClientModel[];

  get clients():ClientModel[]
  {
    return this._clients;
  }

  private _servers:ServerModel[];

  get servers():ServerModel[]
  {
    return this._servers;
  }

  constructor(private _clientService: ClientService, private _serverService: ServerService ) 
  {
  }

  ngOnInit() {
    this._currentClient = new ClientModel();
    this._servers = this._serverService.list();
    this.loadClients();
  }

  private async loadClients() {
    this._clients = await this._clientService.list();
  }
  
  add()
  {
    this.form.isVisible = true;
  }

  async remove(server:ClientModel)
  {
    await this._clientService.remove(server);
    this.loadClients();
  }

  async save()
  {
    await this._clientService.add(this._currentClient);
    this.loadClients();
  }

}
