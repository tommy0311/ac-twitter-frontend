const { defineConfig } = require('@vue/cli-service')
const serverInDev = {
  allowedHosts: "all",
  client: {
    webSocketURL: {
      hostname: 'appweb.asuscomm.com',
      pathname: '/ws',
      password: 'dev-server',
      port: 28080,
      protocol: 'ws',
      username: 'webpack',
    }
  }
}

const serverInGithub = {
  allowedHosts: "all",
  client: {
    webSocketURL: {
      hostname: 'tommy0311.github.io',
      pathname: '/ws',
      password: 'dev-server',
      port: 8080,
      protocol: 'ws',
      username: 'webpack',
    }
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/ac-twitter-frontend/',
  devServer: process.env.NODE_ENV === 'development' ? serverInDev : serverInGithub
})
