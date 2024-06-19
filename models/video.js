const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['kids', 'radio', 'miguel', 'ramon', 'tv'],
      required: true
    }
  }, 
  { versionKey: false, timestamps: true }
);

const addVideoSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  category: Joi.string().valid('kids', 'radio', 'miguel', 'ramon', 'tv').required()
});

videoSchema.post("save", handleMongooseError);

const schemas = { addVideoSchema };

const Video = model("video", videoSchema);

module.exports = { Video, schemas };