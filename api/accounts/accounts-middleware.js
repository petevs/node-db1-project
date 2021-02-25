const accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.budget) {
    return res.status(400).json({
        message: "name and budget are required"
    })
  }
  
  if(typeof req.body.name !== 'string'){
    return res.status(400).json({
      message: "name of account must be a string"
    })
  }

  if(req.body.name.length < 3 || req.body.name.length > 100){
    return res.status(400).json({
      message: "name of account must be between 3 and 100"
    })
  }

  if(typeof req.body.budget !== 'number'){
    return res.status(400).json({
      message: "budget of account must be a number"
    })
  }

  if(req.body.budget > 1000000){
    return res.status(400).json({
      message: "budget of account is too large"
    })
  }
  if(req.body.budget < 0){
    return res.status(400).json({
      message: "budget of account is too small"
    })
  }

  next()

}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const results = await accounts.getAll()
    const names = results.map(account => account.name)
    let previousName

    //Check if account is being updated and whether name changed
    if(req.params.id){
      const result = await accounts.getById(req.params.id)
      previousName = result.name
    } 

    if(previousName === req.body.name){
      return next()
    }

    //If name is included in names and name 
    if(names.includes(req.body.name)){
      res.status(400).json({
        message: 'That name is taken'
      })
    } else {
      next()
    }
  } catch (err) {
      next(err)
  }

}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await accounts.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json({
        message: "account not found"
      })
    }
  } catch (err) {
      next(err)
  }

}
