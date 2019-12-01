import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const LiveDatabase = new Mongo.Collection('liveDatabase');

export const interval = (() => {
    let isRunning = false;
    return (logoutStaleUsersInterval = (1 * 60 * 1000), inactivityTimeOut = (30 * 60 * 1000)) => {
        if (!isRunning) {
            isRunning = true;

            Meteor.setInterval(() => {
                let now = new Date(), overdueTimeStamp = new Date(now - inactivityTimeOut);

                Meteor.users.update(
                    {
                        _id: {
                            $in: LiveDatabase.find({
                                heartbeat: {
                                    $lt: overdueTimeStamp
                                }
                            }).fetch().map((v) => v._id)
                        }
                    },
                    {
                        $set: {
                            'services.resume.loginTokens': []
                        }
                    }
                );
                LiveDatabase.remove({ heartbeat: { $lt: overdueTimeStamp } });
            }, logoutStaleUsersInterval);
        }
    }
})();

Meteor.methods({
    heartbeat(currentUserId) {
        if (this.userId !== currentUserId) return;
        if (LiveDatabase.findOne({ _id: this.userId }) !== undefined) {
            LiveDatabase.update(
                { _id: this.userId },
                {
                    $set: {
                        heartbeat: new Date()
                    }
                }
            );
        } else {
            LiveDatabase.insert({ _id: this.userId, heartbeat: new Date() });
        }

    }
});