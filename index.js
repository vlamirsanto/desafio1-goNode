const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

/**
 * Configurando o Nunjucks
 */
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

/**
 * Middleware que checa se a idade foi digitada
 */
const checkAgeExists = (req, res, next) => {
  const { age } = req.query
  if (!age) return res.redirect('/')

  return next()
}

/**
 * Rota inicial
 */
app.get('/', (req, res) => {
  return res.render('index')
})

/**
 * Rota para checar a idade
 */
app.get('/check', (req, res) => {
  const { age } = req.query

  if (age >= 18) return res.redirect(`/major?age=${age}`)

  return res.redirect(`/minor?age=${age}`)
})

/**
 * Rota para menor de idade
 */
app.get('/minor', checkAgeExists, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

/**
 * Rota para maior de idade
 */
app.get('/major', checkAgeExists, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.listen(3000)
