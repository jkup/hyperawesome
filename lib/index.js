const GitHubApi = require('github')
const express = require('express')
const app = express()

// Github
const github = new GitHubApi()

app.get('/', (req, res) => {
  github.activity.getStargazersForRepo({
    owner: 'zeit',
    repo: 'hpm'
  }, (err, res) => {
    if (err) throw err
    console.log(res[0])
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
