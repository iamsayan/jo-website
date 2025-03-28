import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
    await OneSignal.init({
        appId: process.env.NODE_ENV !== 'production' ? "bb33c9c3-dc83-4c13-b8e1-35b803fa6bdb" : "600da386-32b0-4b27-8da5-d90e9b09aa9a",
        safari_web_id: process.env.NODE_ENV !== 'production' ? "web.onesignal.auto.67f7c7cd-fb70-49d1-aa8c-90d60d7056be" : "web.onesignal.auto.03c56528-3ec2-4727-882a-5ccb48032a98",
        // notifyButton: {
        //     enable: true,
        //     showCredit: false,
        //     size: 'small',
        //     position: 'bottom-left',
        //     colors: {
        //         'circle.background': 'rgb(234 179 8)',
        //         'circle.foreground': 'white',
        //         'badge.background': 'rgb(234 179 8)',
        //         'badge.foreground': 'white',
        //         'badge.bordercolor': 'white',
        //         'pulse.color': 'white',
        //         'dialog.button.background.hovering': 'rgb(77, 101, 113)',
        //         'dialog.button.background.active': 'rgb(70, 92, 103)',
        //         'dialog.button.background': 'rgb(84,110,123)',
        //         'dialog.button.foreground': 'white'
        //     },
        //     displayPredicate: function () {
        //         return !OneSignal.Notifications.permission
        //     }
        // },
        // promptOptions: {
        //     slidedown: {
        //         prompts: [
        //             {
        //                 autoPrompt: true,
        //                 delay: {
        //                     timeDelay: 1,
        //                     pageViews: 1,
        //                 },
        //             }
        //         ]
        //     }
        // },
        allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== 'production',
    });
}
