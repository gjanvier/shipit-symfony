var utils = require('shipit-utils');

/**
 * Vendors task
 * - download composer
 * - install vendors dependencies
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'symfony:vendors', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    return getComposer()
    .then(installVendors);

    function getComposer() {
      shipit.log('Download composer');
      return shipit.local(
        'curl -sS https://getcomposer.org/installer | php',
        {cwd: shipit.config.workspace}
      );
    }

    function installVendors() {
      shipit.log('Install vendors');
      return shipit.local(
        'php composer.phar install --optimize-autoloader',
        {cwd: shipit.config.workspace}
      );
    }
  }
};
