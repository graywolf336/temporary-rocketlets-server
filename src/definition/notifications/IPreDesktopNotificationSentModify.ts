import { IDesktopNotificationBuilder, IHttp, IPersistence, IRead } from '../accessors';
import { IDesktopNotification } from './IDesktopNotification';

/** Handler called when an App wants to modify a notification in a destructive way. */
export interface IPreDesktopNotificationSentModify {
    /**
     * Enables the handler to signal to the Apps framework whether
     * this handler should actually be executed for the notification
     * about to be sent.
     *
     * @param notification The notification which is being sent
     * @param read An accessor to the environment
     * @param http An accessor to the outside world
     * @returns whether to run the execute or not
     */
    checkPreDesktopNotificationSentModify?(notification: IDesktopNotification, read: IRead, http: IHttp): Promise<boolean>;

    /**
     * Method which is to be used to destructively modify the notification.
     *
     * @param notification The notification about to be sent
     * @param builder The builder for modifying the notification via methods
     * @param read An accessor to the environment
     * @param http An accessor to the outside world
     * @param persistence An accessor to the App's persistence
     * @returns the resulting notification
     */
    executePreDesktopNotificationSentModify(
        notification: IDesktopNotification,
        builder: IDesktopNotificationBuilder,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
    ): Promise<IDesktopNotification>;
}
