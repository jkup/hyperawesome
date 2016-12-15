const github = require('./github')

const queryRepositories = (list) => {
  return new Promise((resolve, reject) => {
    const promises = []
    let repositories

    list.map((plugin) => {
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

      resolve(repositories)
    })
  })
}

module.exports = queryRepositories
