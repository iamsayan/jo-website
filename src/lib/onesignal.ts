import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
    await OneSignal.init({
        appId: process.env.NODE_ENV !== 'production' ? "bb33c9c3-dc83-4c13-b8e1-35b803fa6bdb" : "600da386-32b0-4b27-8da5-d90e9b09aa9a",
        safari_web_id: process.env.NODE_ENV !== 'production' ? "web.onesignal.auto.67f7c7cd-fb70-49d1-aa8c-90d60d7056be" : "web.onesignal.auto.03c56528-3ec2-4727-882a-5ccb48032a98",
        notifyButton: {
            enable: true,
            showCredit: false,
            size: 'small',
            position: 'bottom-left',
            prenotify: true,
            text: {
                'dialog.main.button.subscribe': 'Allow',
                'dialog.main.button.unsubscribe': 'Not now',
                'dialog.main.title': 'Get notifications',
                'dialog.blocked.message': 'You have blocked notifications',
                'dialog.blocked.title': 'Notifications blocked',
                'message.action.subscribed': 'Notifications enabled',
                'message.action.unsubscribed': 'Notifications disabled',
                'message.action.resubscribed': 'Notifications enabled',
                'message.action.subscribing': 'Enabling notifications...',
                'message.prenotify': 'Get notifications',
                'tip.state.blocked': 'Notifications blocked',
                'tip.state.subscribed': 'Notifications enabled',
                'tip.state.unsubscribed': 'Notifications disabled',
            },
            displayPredicate: function () {
                return !OneSignal.Notifications.permission
            }
        },
        promptOptions: {
            slidedown: {
                prompts: [
                    {
                        autoPrompt: true,
                        delay: {
                            timeDelay: 1,
                            pageViews: 1,
                        },
                        type: 'push',
                        categories: [],
                    }
                ]
            }
        },
        allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== 'production',
    });
}
