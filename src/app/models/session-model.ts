import ServerModel from './server-model';
import { ClientModel } from './client-model';
import CamModel from './cam-model';
import ResourceModel from './resource-model';

export class SessionModel extends ResourceModel {

    constructor(src = null)
    {
        super(src);
    }

    public server: ServerModel;
    public client: ClientModel;
    public cam: CamModel;

}