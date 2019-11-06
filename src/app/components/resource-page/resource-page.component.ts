import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.css']
})
export class ResourcePageComponent implements OnInit {

  private _pageTitle:string;
  
  get pageTitle():string{
    return this._pageTitle;
  }

  constructor(private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {

    this.activatedRoute.url.subscribe(() => {
      this._pageTitle = this.activatedRoute.snapshot.firstChild.data.name;
    })

  }

}
