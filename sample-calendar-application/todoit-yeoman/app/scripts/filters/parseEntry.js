angular.module('todoitApp.filters')
  .filter('parseEntry', ['$parse', function($parse) {
    return function(val, scope) {
      var i = 0;
      var data = {
        raw: val
      };

      if (val) {
        // Find urls
        var strUrls = val.match(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g),
            urls = [];

        if (strUrls) {
          for (i = 0; i < strUrls.length; i++) {
            urls.push(strUrls[i]);
          }
          val = val.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, '');
          data['urls'] = urls;
        }

        // Find tags
        var strTags = val.match(/[#]+[A-Za-z0-9_]+/g),
            tags = [];

        if (strTags) {
          for (i = 0; i < strTags.length; i++) {
            tags.push(strTags[i]);
          }
          val = val.replace(/[#]+[A-Za-z0-9_]+/g, '');
          data['tags'] = tags;
        }

        // Find users
        var strUsers = val.match(/[@]+[A-Za-z0-9_]+/g),
            users = [];

        if (strUsers) {
          for (i = 0; i < strUsers.length; i++) {
            var user = strUsers[i];

            if (scope.users) {
              var parseVal = $parse("users." + user.slice(1))(scope);
              if (typeof(parseVal) === 'undefined') parseVal = user;
            }
            else {
              var parseVal = user;
            }

            users.push(parseVal);
          }
          val = val.replace(/[@]+[A-Za-z0-9_]+/g, '');
          data['users'] = users;
        }

        // Finally, parse the date
        var date = chrono.parseDate(val);
        if (date) { 
          data['date'] = date;
        }
      }

      return data;
    }
  }]);