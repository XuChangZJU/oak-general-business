import { concat, without } from "lodash";
import { NotificationData } from "oak-frontend-base";

interface TimedNotificationdata extends NotificationData {
    dieAt: number;
};

let KILLER: NodeJS.Timeout | undefined = undefined;
export default OakComponent({
    data: {
        messages: [] as TimedNotificationdata[],
    },
    async formData({ }) {
        const data = this.consumeNotification();
        if (data) {
            const now = Date.now();
            return {
                messages: [
                    ...this.state.messages,
                    Object.assign(data, {
                        dieAt: now + (data.duration || 3000),
                    })
                ],
            };
        }
        return {};
    },
    observers: {
        messages(messages: TimedNotificationdata[]) {
            if (messages.length > 0) {
                let firstDieAt: number = Number.MAX_VALUE;
                let vicitim: TimedNotificationdata;
                for (const message of messages) {
                    if (message.dieAt < firstDieAt) {
                        vicitim = message;
                        firstDieAt = vicitim.dieAt;
                    }
                }

                if (KILLER) {
                    clearTimeout(KILLER);
                }
                KILLER = setTimeout(
                    () => {
                        const messages = without(this.state.messages, vicitim);
                        this.setState({
                            messages,
                        });
                    }
                , Math.max(firstDieAt - Date.now(), 0));
            }
            else {
                KILLER = undefined;
            }            
        }
    }
});
