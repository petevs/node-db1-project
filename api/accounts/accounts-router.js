
const router = require('express').Router()
const accounts = require('./accounts-model')
const { checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const results = await accounts.getAll()
    res.json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const result = await accounts.getById(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const result = await accounts.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const result = await accounts.updateById(req.params.id, req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await accounts.deleteById(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
