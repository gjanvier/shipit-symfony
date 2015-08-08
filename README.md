# shipit-symfony

Deploy symfony projects with Shipit.

[Shipit](https://github.com/shipitjs/shipit) is a brilliant alternative to
Capistrano to automate the deployment of applications on remote servers. This
module bring some complementary tasks to manage [Symfony](http://symfony.com)
applications, in the manner of [Capifony](https://github.com/everzet/capifony).

**Features**

 - Update vendors with Composer
 - Clear symfony cache before
 - Install assets
 - Easy integration with [shipit-shared](https://github.com/timkelty/shipit-shared)

## Install

```
npm install shipit-symfony
```

## Usage

### Example `shipitfile.js`

```js
module.exports = function (shipit) {

  shipit.initConfig({
    default: {
      workspace: 'tmp/shipit',
      deployTo: '/home/deploy/myProject',
      repositoryUrl: 'git@bitbucket.org:user/repo.git',
      keepReleases: 3,
      shallowClone: true,

      // These files/folders will not be transfered
      ignores: ['.git', 'node_modules',
                // usual folders for symfony applications
                'web/bundles', 'composer.phar', 'app/cache', 'app/logs'],

      // Configuration for shipit-shared (great module !)
      shared: {
        overwrite: true,
        dirs: [
          'app/logs',
          'web/uploads'
        ],
        files: [
          'app/config/parameters.yml'
        ]
      },

      symfony: {
        // By default, cache will be cleared and assets will be install on
        // 'updated' event. If you use 'shipit-shared', specify 'sharedEnd'
        // event to make that task start at the right moment.
        installOn: 'sharedEnd'
      }
    }
  });

  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  require('shipit-symfony')(shipit);
};
```

## Tasks

These tasks are automatically managed during the deployment.

#### `symfony:vendors`
Install vendors locally, just after the project is fetched from its repository
and before it is packaged and uploaded to the remote server.

#### `symfony:cache`
Clear cache (dev and prod) before the new release replaces the current one.

#### `symfony:assets`
Dump Assetic and install assets before the new release replaces the current one.

## Dependencies

This module has been tested with shipit-shared v4.1.4. Older versions may work,
but shipit-symfony requires event `sharedEnd` to be triggered (not in oldest version).
