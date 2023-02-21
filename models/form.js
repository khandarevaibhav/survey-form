const mongoose = require("mongoose");



const formSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },

    questions: {
      type:[
        {
          questionContent:{type:String},
          questionNumber:{type:Number},
          answerType:{type:String},
          options:{type:Array}
        }
      ],
      required:false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("Form", formSchema);