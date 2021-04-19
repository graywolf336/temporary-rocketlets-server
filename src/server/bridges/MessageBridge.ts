import { IMessage } from '../../definition/messages';
import { IRoom } from '../../definition/rooms';
import { IUser } from '../../definition/users';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';
import { BaseBridge } from './BaseBridge';
import { ITypingDescriptor } from './IMessageBridge';

export abstract class MessageBridge extends BaseBridge {
    public async doCreate(message: IMessage, appId: string): Promise<string> {
        if (this.checkWritePermission(appId)) {
            return this.create(message, appId);
        }
    }

    public async doUpdate(message: IMessage, appId: string): Promise<void> {
        if (this.checkWritePermission(appId)) {
            return this.update(message, appId);
        }
    }

    public async doNotifyUser(user: IUser, message: IMessage, appId: string): Promise<void> {
        if (this.checkWritePermission(appId)) {
            return this.notifyUser(user, message, appId);
        }
    }

    public async doNotifyRoom(room: IRoom, message: IMessage, appId: string): Promise<void> {
        if (this.checkWritePermission(appId)) {
            return this.notifyRoom(room, message, appId);
        }
    }

    public async doTyping(options: ITypingDescriptor, appId: string): Promise<void> {
        if (this.checkWritePermission(appId)) {
            return this.typing(options, appId);
        }
    }

    public async doGetById(messageId: string, appId: string): Promise<IMessage> {
        if (this.checkReadPermission(appId)) {
            return this.getById(messageId, appId);
        }
    }

    protected abstract create(message: IMessage, appId: string): Promise<string>;
    protected abstract update(message: IMessage, appId: string): Promise<void>;
    protected abstract notifyUser(user: IUser, message: IMessage, appId: string): Promise<void>;
    protected abstract notifyRoom(room: IRoom, message: IMessage, appId: string): Promise<void>;
    protected abstract typing(options: ITypingDescriptor, appId: string): Promise<void>;
    protected abstract getById(messageId: string, appId: string): Promise<IMessage>;

    private checkReadPermission(appId: string): boolean {
        if (AppPermissionManager.hasPermission(appId, AppPermissions.message.read)) {
            console.log('message read permissions has', appId);
            return true;
        }

        AppPermissionManager.notifyAboutError(new PermissionDeniedError({
            appId,
            missingPermissions: [AppPermissions.message.read],
        }));

        return false;
    }

    private checkWritePermission(appId: string): boolean {
        if (AppPermissionManager.hasPermission(appId, AppPermissions.message.write)) {
            return true;
        }

        AppPermissionManager.notifyAboutError(new PermissionDeniedError({
            appId,
            missingPermissions: [AppPermissions.message.write],
        }));

        return false;
    }
}
