import ResourceModel from './resource-model';
import { ClientModel } from './client-model';

export default class CamModel extends ResourceModel{

    constructor(src= null)
    {
        super(src);
    }
    
    public name:string;
    public host:string;
    public client: ClientModel;

}