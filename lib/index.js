const GitHubApi = require('github')
const express = require('express')
const app = express()

// Data
const plugins = require('./data/plugins')
const themes = require('./data/themes')

// Credentials

const CLIENT_ID ='0d93f9a495f66ab52118'
const CLIENT_SECRET = '50c39131f4325e9480cc9bd2ae663726db572fb0'

// Github
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

// App settings
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/lib/views')
app.use(express.static(process.cwd() + '/lib/public'))

app.get('/', (req, res) => {
  const promises = []
  let repositories

  plugins.map((plugin) => {
    promises.push(
      github.repos.get({
        owner: plugin.owner,
        repo: plugin.repo
      })
    )
  })

  Promise.all(promises).then(repos => {
    repositories = repos.map((repo) => {
      return {
        url: repo.html_url,
        name: repo.name,
        description: repo.description,
        count: repo.stargazers_count
      }
    })

    res.render('index', { title: 'HyperAwesome', repositories })
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
