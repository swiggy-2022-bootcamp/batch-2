export const getOne = (model) => async (req, res) => {
  try {
    const document = await model.findById(req.params.id).exec();
    if (!document) {
      return res
        .status(400)
        .send({ message: `No Question found with given id: ${req.params.id}` });
    }
    res.status(200).send({ data: document });
  } catch (err) {
    res.status(400).end();
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const documents = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec();

    res.status(200).json({ data: documents });
  } catch (err) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const document = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: document });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
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

    res.status(200).json({ data: updatedDocument });
  } catch (err) {
    res.status(400).end();
  }
};

export const deleteOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    });
    if (!removed) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: removed });
  } catch (err) {
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
