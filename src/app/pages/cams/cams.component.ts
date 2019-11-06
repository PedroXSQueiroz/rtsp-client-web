import { Component, OnInit, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { ServerService } from 'src/app/services/server.service';
import { ClientService } from 'src/app/services/client.service';
import CamModel from 'src/app/models/cam-model';
import { FormModalComponent } from 'src/app/components/form-modal/form-modal.component';
import { ClientModel } from 'src/app/models/client-model';

@Component({
  selector: 'app-cams',
  templateUrl: './cams.component.html',
  styleUrls: ['./cams.component.css']
})
export class CamsComponent implements OnInit {

  @ViewChild(FormModalComponent, { static: false }) form: FormModalComponent;

  private _cams: CamModel[];

  get cams(): CamModel[] {
    return this._cams;
  }

  private _currentCam: CamModel;

  get currentCam(): CamModel {
    return this._currentCam;
  }

  private _clients: ClientModel[];

  get clients(): ClientModel[] {
    return this._clients;
  }

  constructor(
    private _camService: CameraService,
    private _clientService: ClientService) {

  }

  ngOnInit() {
    this._currentCam = new CamModel();
    this.loadCams();
    this.loadClient();
  }

  private async loadClient() {
    this._clients = await this._clientService.list();
  }

  private async loadCams() {
    this._cams = await this._camService.list();
  }

  remove(cam: CamModel) {

  }


  add() {
    this.form.isVisible = true;
  }

  async save() {
    await this._camService.add(this._currentCam);
    this._cams = await this._camService.list();
  }

}
