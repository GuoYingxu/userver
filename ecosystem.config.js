module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      interpreter: './node_modules/.bin/ts-node', 
      name      : 'xhlyzt.cn',
      script    : 'server.ts',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT:88,
      }
    },

    // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    // production : {
    //   user : 'administrator',
    //   // host : '47.107.147.98',
    //   // host : '47.107.147.98',
    //   ref  : 'origin/master',
    //   repo : 'git@github.com:GuoYingxu/cqserver.git',
    //   path : 'c:\\server\\cqserver',
    //   'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    // },
    production : {
      user : 'guoyingxu',
      host : '47.104.222.17',
      ref  : 'origin/master',
      repo : 'git@github.com:GuoYingxu/userver.git',
      path : '/var/www/userver/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
