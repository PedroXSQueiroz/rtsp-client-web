export default abstract class ResourceModel {
    
    constructor(src = null)
    {
        if(src)
        {
            for(let prop in src)
            {
                this[prop] = src[prop];
            }
        }
    }
    
    public id:number;
}