import { AsyncTest, Expect, SetupFixture, SpyOn, Test } from 'alsatian';
import { ILivechatRoom } from '../../../src/definition/livechat';
import { IUser } from '../../../src/definition/users';
import { LivechatUpdater } from '../../../src/server/accessors/LivechatUpdater';
import { ILivechatBridge } from '../../../src/server/bridges';
import { AppBridges } from '../../../src/server/bridges';

import { TestData } from '../../test-data/utilities';

export class LivechatUpdaterTestFixture {
    private lu: LivechatUpdater;
    private mockLivechatBridge: ILivechatBridge;
    private mockBridges: AppBridges;
    private testAppId = 'testing-app';

    @SetupFixture
    public setupFixture() {
        this.mockLivechatBridge = {
            closeRoom(room: ILivechatRoom, comment: string, closer: IUser | undefined, appId: string): Promise<boolean> {
                return Promise.resolve(true);
            },
        } as ILivechatBridge;
        this.mockBridges = {
            getLivechatBridge: (): ILivechatBridge => {
                return this.mockLivechatBridge;
            },
        } as AppBridges;
        this.lu = new LivechatUpdater(this.mockBridges, this.testAppId);
    }

    @Test()
    public useLivechatUpdater() {
        Expect(this.lu.closeRoom).toBeDefined();
        Expect(this.lu.transferVisitor).toBeDefined();
    }

    @AsyncTest()
    public async useCloseRoom() {
        const testRoom = TestData.getRoom() as ILivechatRoom;
        const testUser = TestData.getUser();

        const closeRoomSpy = SpyOn(this.mockLivechatBridge, 'closeRoom');

        await this.lu.closeRoom(testRoom, 'test-close-room', testUser);

        Expect(this.mockLivechatBridge.closeRoom).toHaveBeenCalledWith(testRoom, 'test-close-room', testUser, this.testAppId);

        closeRoomSpy.restore();
    }
}
