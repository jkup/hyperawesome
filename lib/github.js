const GitHubApi = require('github')
const CLIENT_ID = '0d93f9a495f66ab52118'
const CLIENT_SECRET = '50c39131f4325e9480cc9bd2ae663726db572fb0'

const github = new GitHubApi({
  headers: {
    'user-agent': 'Awesome-Hyper-App'
  }
})

github.authenticate({
  type: 'oauth',
  key: CLIENT_ID,
  secret: CLIENT_SECRET
})

module.exports = github
