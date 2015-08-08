var utils = require('shipit-utils');

/**
 * Cache task
 * - clear cache for dev
 * - clear cache for prod
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'symfony:cache', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    return clearCacheDev()
    .then(clearCacheProd)
    .then(function() {
      shipit.emit('cacheCleared');
    });


    function clearCacheDev() {
      shipit.log('Clear cache for dev');
      return shipit.remote('cd ' + shipit.releasePath + ' && ' +
          'php app/console cache:clear'
      );
    }

    function clearCacheProd() {
      shipit.log('Clear cache for prod');
      return shipit.remote('cd ' + shipit.releasePath + ' && ' +
          'php app/console cache:clear --env=prod --no-debug'
      );
    }
  }
};
