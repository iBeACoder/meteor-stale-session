# punit:stale-session

Stale session and session timeout handling for [meteorjs](http://www.meteor.com/).

#### This package has been developed using [zuuk:stale-session](https://atmospherejs.com/zuuk/stale-session) as base.

## Quick Start

```sh
$ meteor add punit:stale-session
```

## Key Concepts

When a user logs in to a meteor application, they may gain access to privileged information and functionality.  If they neglect to log off, another user of the same computer can effectively impersonate that user and gains the same rights.  As it currently stands, (meteor 1.8.2), login tokens remain valid for eternity so this creates a large window of opportunity for impersonators.

This package is designed to detect a user's inactivity and automatically log them off after a configurable amount of time thereby reducing the size of this window to just the inactivity delay.

It is possible to configure both the timeout, the events that consitute activity and choosing to redirect the user to another page.

The user will be logged off whether the browser window remains open or not.

The user is logged off by the server and disabling javascript in the browser (kind of pointless in meteor!) would not prevent automatic log off.

The user can be logged on multiple times on multiple devices and activity in any one of those devices will keep the sessions alive.

The plugin uses a heartbeat that is configurable but defaulted to ensure that the server is not inundated with heartbeats from clients in systems with many concurrent users.

## Configuration

### Configuration on Server:

```javascript
import { interval } from 'meteor/punit:stale-session';

Meteor.startup(() => {
    inteval();
});
```

#### interval() can have two optional parameters:

1. logoutStaleUsersInterval, this determines how frequently checks for stale users occur. Default is 1 minute
2. inactivityTimeOut, this determins how long before a user is determined as stale. Default is 30 minutes.

### Configuring on Client

```javascript
import { staleSessionCheck } from 'meteor/punit:stale-session';

//Login(email, password, callback(error, success) {
    //if (success) {
        staleSessionCheck();
    // }
//});
```

**DO NOT FORGET TO ADD THIS FUNCTION INSIDE STARTUP IN CLIENT**
```javascript
import { staleSessionCheck } from 'meteor/punit:stale-session';

Meteor.startup(() => {
    if (Meteor.userId()) {
        staleSessionCheck();
    }
});
```

#### staleSessionCheck() can have three optional parameters:

1. heartBeat determines frequenty to sync with server, default 3 minutes.
2. activities detemines which user action classifies as valid action to renew session.
3. page determins which page to redirect the user after session has expired and user is logged out.

## License

MIT
