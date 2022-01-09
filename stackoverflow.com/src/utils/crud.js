import { logger } from "./logger.js";

export const getOne = (model) => async (req, res) => {
    const methodName = `#getOne`
    logger.info(`${methodName} Request recieved for getting a resource matching a given id.`)
    try {
    const document = await model.findById(req.params.id).exec();
    if (!document) {
      logger.info(`${methodName} No resource exists with id: ${req.params.id}`)
      return res
        .status(400)
        .end();
    }
    logger.info(`${methodName} Document: ${JSON.stringify(document)} found in collection for given id: ${req.params.id}`)
    res.status(200).send({ data: document });
  } catch (err) {
    logger.error(`${methodName} Error encountered while fetching the resource from the database.`)
    res.status(400).end();
  }
};

export const getMany = (model) => async (req, res) => {
  const methodName = `#getMany`
  logger.info(`${methodName} Request recieved for finding all resources matching a predicate.`)
  try {
    const documents = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec();
    logger.info(`${methodName} Documents recieved from the database are : ${JSON.stringify(documents)}`)
    res.status(200).json({ data: documents });
  } catch (err) {
    logger.error(`${methodName} Error encountered while fetching the resource from the database.`)
    res.status(400).end();
  }
};

export const createOne = (model) => async (req, res) => {
  const methodName = `#createOne`
  const createdBy = req.user._id;
  logger.info(`${methodName} Request recieved for creating a resource in database having a requestbody: ${JSON.stringify({...req.body, createdBy})}`)  
  try {
    const document = await model.create({ ...req.body, createdBy });
    logger.info(`${methodName} Resource successfully created ${JSON.stringify({...req.body, createdBy})}`)  
    res.status(201).json({ data: document });
  } catch (e) {
    logger.error(`${methodName} Error encountered while creating a resource having a requestbody: ${JSON.stringify({...req.body, createdBy})}`)  
    res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
  const methodName = `#updateOne`
  logger.info(`${methodName} Request recieved for updating a resource in database with new requestbody: ${JSON.stringify(req.body)}`)  
  try {
    const updatedDocument = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDocument) {
      return res.status(400).end();
    }
    logger.info(`${methodName} Updated document: ${JSON.stringify(updatedDocument)}`)  
    res.status(200).json({ data: updatedDocument });
  } catch (err) {
    logger.error(`${methodName} Error encountered while updating the resource in the database.`) 
    res.status(400).end();
  }
};

export const deleteOne = (model) => async (req, res) => {
  const methodName = `#deleteOne`
  logger.info(`${methodName} Request recieved for deleting a resource in database.`)  
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    });
    if (!removed) {
      return res.status(400).end();
    }
    logger.info(`${methodName} Removed document: ${JSON.stringify(removed)}`)  
    return res.status(200).json({ data: removed });
  } catch (err) {
    logger.error(`${methodName} Error encountered while deleting the resource in the database.`) 
    res.status(400).end();
  }
};

export const crudRepository = (model) => ({
  createOne: createOne(model),
  findOne: getOne(model),
  findMany: getMany(model),
  updateOne: updateOne(model),
  removeOne: deleteOne(model),
});
