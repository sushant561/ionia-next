import mongoose, { Schema } from "mongoose";

const previousTestSchema = new Schema(
  {
    examType: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"], // Optional: to restrict values to specific shifts
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Allow virtuals to be included in JSON responses
    toObject: { virtuals: true }, // Allow virtuals to be included in plain objects
  }
);

// Virtual field for calculating number of questions
previousTestSchema.virtual("numberOfQuestions").get(function () {
  return this.questions.length;
});

export const PreviousTest = mongoose.model("PreviousTest", previousTestSchema);
