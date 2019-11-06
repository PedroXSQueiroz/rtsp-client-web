import ServerModel from './server-model';
import ResourceModel from './resource-model';

export class ClientModel extends ResourceModel{
    
    constructor(src = null, server = null)
    {
        super(src);

        if(server)
        {
            this.server = server;
        }
    }
    
    public name:string;
    public address:string;
    public resourcePort:number;
    public server: ServerModel;
}