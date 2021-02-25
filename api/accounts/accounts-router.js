
const router = require('express').Router()
const accounts = require('./accounts-model')
const { 
  checkAccountPayload, 
  checkAccountId,
  checkAccountNameUnique
 } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const results = await accounts.getAll()
    res.json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    // const result = await accounts.getById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const result = await accounts.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const result = await accounts.updateById(req.params.id, req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
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
