// functions used by questions controller for creat/update/delete question

/**
 * createOne : create new Question for user based on userId
 */
export const createOne = model => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const document = await model.create({ ...req.body, createdBy });
    
    res.status(201).json({ message: "Question posted Successfully", data: document });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

/**
 * updateOne : update Question based on userId and questionId
 */
export const updateOne = model => async(req, res) => {
  try{
    const updatedDocument = await model.findOneAndUpdate({
      createdBy: req.user._id,
      _id: req.params.id
    }, 
    req.body, {new: true}
    )
    .select("-updatedAt, -__v")
    .lean()
    .exec();

    if(!updatedDocument){
      return res.status(400).end()
    }

    res.status(200).json({ message: "Question updated Successfully", data: updatedDocument})
  }catch(err){
    res.status(400).end();
  }
}

/**
 * list of operation 
 */
export const crudOperationList = model => ({
  createOuestion: createOne(model),
  updateQuestion: updateOne(model)
});
