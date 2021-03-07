import { ILivechatUpdater } from '../../definition/accessors';
import { ILivechatRoom, ILivechatTransferData, IVisitor } from '../../definition/livechat';
import { IUser } from '../../definition/users';
import { AppBridges } from '../bridges';

export class LivechatUpdater implements ILivechatUpdater {
    constructor(private readonly bridges: AppBridges, private readonly appId: string) { }

    public transferVisitor(visitor: IVisitor, transferData: ILivechatTransferData): Promise<boolean> {
        return this.bridges.getLivechatBridge().transferVisitor(visitor, transferData, this.appId);
    }

    public closeRoom(room: ILivechatRoom, comment: string, closer?: IUser): Promise<boolean> {
        return this.bridges.getLivechatBridge().closeRoom(room, comment, closer, this.appId);
    }

    public setCustomFields(token: IVisitor['token'], key: string, value: string, overwrite: boolean): Promise<boolean> {
        return this.bridges.getLivechatBridge().setCustomFields({ token, key, value, overwrite }, this.appId)
            .then((result) => result > 0);
    }
}
