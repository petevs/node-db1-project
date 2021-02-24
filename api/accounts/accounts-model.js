const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db.select("*").from("accounts")
}

const getById = id => {
  // DO YOUR MAGIC
    return db.select("*")
      .from("accounts")
      .where("id",id)
      .first()
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db.insert({
    name: account.name,
    budget: account.budget
  })
    .into("accounts")

  const result = await db("accounts")
    .where("id", id)
    .first()

  return result
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
