const queryRepositories = require('./queryRepositories')
const express = require('express')
const app = express()

// App settings
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/lib/views')
app.use(express.static(process.cwd() + '/lib/public'))

app.get('/', (req, res) => {
  res.render('index', {title: 'AwesomeHyper'})
})

app.get('/plugins', (req, res) => {
  const plugins = require('./data/plugins')
  queryRepositories(plugins).then((repositories) => {
    res.render('index', {title: 'Plugins', repositories})
  })
})

app.get('/themes', (req, res) => {
  const themes = require('./data/themes')
  queryRepositories(themes).then((repositories) => {
    res.render('index', {title: 'Themes', repositories})
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

module.exports = app
