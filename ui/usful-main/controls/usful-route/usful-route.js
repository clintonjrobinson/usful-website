'use strict';

(function () {
  Polymer('usful-route', {
    route: '/',
    active: false,
    context: {},
    matcher: {},

    contextChanged: function (oldContext, newContext) {
      //This is an observer that is triggered when the context changes.  The context will change when the
      //page.js library below intercepts the client side "route"

      //this.matcher - Check to see if the matcher has been created yet, ie. make sure the control is initialized
      //newContext.path - Make sure the new context being switched to contains a path. If it doesn't, then the context has
      //changed for some other reason. (ie. maybe somebody changed it manually, not through an event trigger)
      if (this.matcher && newContext.path) {
        //Use page.js own matching call to see if the new path matches the route the context has changed to.
        //We do this because contextChanged will be fired when any route is hit, not just this one
        this.active = this.matcher.match(newContext.path, newContext.params);
      } else {
        this.active = false;
      }
    },
    ready: function (e) {
      var template = this;
      //Create a matcher based on the route passed in.  We will use this later in contextChanged.
      template.matcher = new page.Route(template.route);

      //Tell page.js to listen for this route.
      page(template.route, function (ctx) {
        template.context = ctx;
        template.active = true;
      });
    }
  });
})();