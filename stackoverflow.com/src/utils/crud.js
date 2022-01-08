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
