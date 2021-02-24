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


}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
}
