var utils = require('shipit-utils');

/**
 * Assets task
 * - dump assetic
 * - install assets
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'symfony:assets', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    return dumpAssetic()
    .then(installAssets);


    function dumpAssetic() {
      shipit.log('Dump assetic');
      return shipit.remote('cd ' + shipit.releasePath + ' && ' +
          'php app/console assetic:dump --env=prod --no-debug'
      );
    }

    function installAssets() {
      shipit.log('Install assets');
      return shipit.remote('cd ' + shipit.releasePath + ' && ' +
          'php app/console assets:install web --symlink'
      );
    }
  }
};
