import { IPermission } from '../../definition/permission/IPermission';
import { IUser } from '../../definition/users';

export const UserPermissions: { [permission: string]: IPermission } = {
    // getById, getByUsername, getAppUser, getActiveUserCount
    read: {
        name: 'user.read',
    },
    // create, update, remove
    write: {
        name: 'user.write',
    },
};

export const AppUserBridge = {
    getById(id: string, appId: string): void {
        return;
    },
    getByUsername(username: string, appId: string): void {
        return;
    },
    getAppUser(appId: string): void {
        return;
    },
    getActiveUserCount(): void {
        return;
    },
    create(data: void) {
        return;
    },
    remove(user: IUser, appId: string): void {
        return;
    },
    update(user: IUser, updates: void): void {
        return;
    },
};