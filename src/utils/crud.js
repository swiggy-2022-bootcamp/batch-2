/*
These are generic CRUD Controllers used by almost all models.
Creating a generic controllers will satisfy DRY principles.
*/

export const getOne = model => async (req, res) => { // Used to Fetch an entity by its ID
  try {
    const doc = await model
      .findOne({ createdBy: req.entity._id, _id: req.params.id }) // Only find entities created by the api requester
      .lean() // to convert a Mongoose Object to a JSON object
      .exec()

    if (!doc) {
      return res.status(400).end() // Return a 400 if no entity is found
    }

    res.status(200).json({ data: doc }) // Return the fetched entity
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => { // Used to fetch list of entities created by requester
  try {
    const docs = await model
      .find({ createdBy: req.entity._id })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => { // Used to Create an entity
  const createdBy = req.entity._id
  try {
    const doc = await model.create({ ...req.body, createdBy }) // adding createdBy here will map the requester as creator for that entity
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => { // Used to Update an entity
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.entity._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    console.log(updatedDoc)
    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => { // Used to delete an entity
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.entity._id,
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = model => ({ // Exporting Generic Controllers
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
