import ResourceModel from './resource-model';

export default class ServerModel extends ResourceModel{

    constructor(src=null)
    {
        super(src);
    }
    
    public name:string;
    public address:string;
    public resourcePort:number;
    public inputVideoPort:number;
    public outputVideoPort:number;
    public wsConnectionPort:number;

}