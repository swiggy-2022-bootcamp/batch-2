// functions used by questions controller for creat/update/delete question

/**
 * createOne : create new Question for user based on userId
 */
export const createOne = model => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const document = await model.create({ ...req.body, createdBy });
    
    res.status(201).json({ message: "Question posted Successfully", data: document });
  } catch(e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
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
  }catch(e){
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).end();
  }
}

/**
 * getOne : find question from dB by Id
 */
export const getOne = model => async (req, res) => {
  try {
    const document = await model.findById(req.params.id)
    .select("-updatedAt, -__v")
    .populate("answers")
    .exec();

    if (!document) {
      return res.status(400).send({message: `No Question found with given id: ${req.params.id}`});
    }
    res.status(200).send({ data: document });
  } catch(e) {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).end();
  }
};

/**
 * getMany : get all the questions from DB created by user based on userID
 */
export const getMany = model => async (req, res) => {
  try{
    const documents = await model.find({createdBy: req.user._id})
      .select("-updatedAt, -__v")
      .lean()
      .populate("answers")
      .exec();

      res.status(200).json({ message: `All question asked by: ${req.user.firstName} ${req.user.lastName}`, data: documents});
  }catch(e){
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).end();
  }
}

/**
 * deleteOne: delete question based on userId and QuestionId
 */
export const deleteOne = model => async (req, res) => {
  try{
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    })
    .select("-updatedAt, -__v");

    if(!removed){
      return res.status(400).end();
    }
    return res.status(200).json({ message: "Question deleted Successfully", data: removed})
  }catch(e){
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', e)
    res.status(400).end();
  }
}

/**
 * list of operation 
 */
export const crudOperationList = model => ({
  createOuestion: createOne(model),
  findQuestionById: getOne(model),
  findQuestion: getMany(model),
  updateQuestion: updateOne(model),
  deleteQuestion: deleteOne(model)
});

