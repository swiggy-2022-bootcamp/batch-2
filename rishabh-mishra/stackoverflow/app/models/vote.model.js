module.export = (mongoose) => {
  let schema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    action: Boolean,
  });
  return schema;
};
