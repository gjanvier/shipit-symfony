var utils = require('shipit-utils');

/**
 * Symfony tasks
 */

module.exports = function (gruntOrShipit) {
  require('./vendors')(gruntOrShipit);
  require('./cache')(gruntOrShipit);
  require('./assets')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'symfony:install', [
    'symfony:cache',
    'symfony:assets'
  ]);


  var shipit = utils.getShipit(gruntOrShipit);

  // Install vendors locally
  shipit.on('fetched', function() {
    shipit.start('symfony:vendors');
  });

  shipit.on('start', function() {
    // Prepare new release on server before publish
    var event = shipit.config.symfony.installOn;
    event = event !== undefined ? event : 'updated'; // or 'sharedEnd'
    shipit.on(event, function() {
      shipit.start('symfony:install');
    });
  });
};
