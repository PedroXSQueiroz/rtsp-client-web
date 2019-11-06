import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { routes } from './config/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  private _links;
  
  get links() {
    return this._links;
  }
  
  private _menuIsVisible:boolean

  get isMenuVisible():boolean{
    return this._menuIsVisible;
  }

  showMenu(visibility:boolean)
  {
    this._menuIsVisible = visibility;
  }
  
  title = 'rtsp-client-web';
  
  ngOnInit(): void {
    
    let links = [];

    for(let route of routes)
    {
      
      if(route.children){
        
        let root = route.path;
        
        route.children.forEach(childRoute => links.push({ path: `${root}/${childRoute.path}`, data: childRoute.data }))
      
      }else{
      
        links.push({ path: route.path, data: route.data })
      
      }
    }
    
    this._links = links;
  }

}
