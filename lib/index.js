const GitHubApi = require('github')
const express = require('express')
const app = express()

// Data
const plugins = require('../data/plugins')

// Github
const github = new GitHubApi()

// App settings
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/lib/views')

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
        url: repo.url,
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
