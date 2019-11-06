import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() resourceName: string;
  @Output() onFinish = new EventEmitter();

  private _isVisible:boolean;

  get isVisible():boolean{
    return this._isVisible;
  }
  
  set isVisible(visible: boolean)
  {
    console.log(this.resourceName);
    this._isVisible = visible;
  }
  
  constructor() { }


  finish()
  {
    this.onFinish.emit(null);
    this._isVisible = false;
  }

  dismiss()
  {
    this._isVisible = false;
  }

  ngOnInit() {
  }

}
