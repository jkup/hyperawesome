const GitHubApi = require('github')
const express = require('express')
const app = express()

// data
const plugins = require('../data/plugins')

// Github
const github = new GitHubApi()

app.get('/', (req, res) => {
  const promises = []
  let data

  plugins.map((plugin) => {
    promises.push(
      github.repos.get({
        owner: plugin.owner,
        repo: plugin.repo
      })
    )
  })

  Promise.all(promises).then(repos => {
    data = repos.map((repo) => {
      return {name: repo.name, count: repo.stargazers_count}
    })

    console.log(data)
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
