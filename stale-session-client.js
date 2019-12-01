import { Meteor } from 'meteor/meteor';

export const staleSessionCheck = (() => {
    let heartBeat = (3 * 60 * 1000);
    let activities = "mousemove click keydown";
    let page = '/';

    let isRunning = false;
    return (tempHeartBeat = heartBeat, tempActivities = activities, tempPage = page) => {
        if (!isRunning) {
            if (Meteor.userId()) {
                isRunning = true;

                heartBeat = tempHeartBeat;
                activities = tempActivities;

                let activityDetected = false;

                const performCheck = () => {
                    if (Meteor.userId() && activityDetected) {
                        Meteor.call('heartbeat', Meteor.userId());
                        activityDetected = false;
                    } else if (!Meteor.userId()) {
                        $(document).off(activities, setActivity);
                        Meteor.clearInterval(interval);

                        heartBeat = (3 * 60 * 1000);
                        activities = "mousemove click keydown";

                        isRunning = false;

                        window.location.pathname = tempPage;
                    }
                }

                const setActivity = () => {
                    activityDetected = true;
                }

                $(document).on(activities, setActivity);

                let interval = Meteor.setInterval(performCheck, heartBeat);

                Meteor.call('heartbeat', Meteor.userId());
            }
        }
    }
})();