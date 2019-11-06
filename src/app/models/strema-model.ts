import ResourceModel from './resource-model';

export class StreamModel extends ResourceModel{
    
    constructor(src = null)
    {
        super(src);
    }
    
    public url:string;
}