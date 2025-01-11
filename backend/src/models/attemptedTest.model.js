const mongoose = require("mongoose");

const AttemptedTestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  examType: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      markedAnswer: { type: Number, required: true },
      timeSpent: { type: Number, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  analysis: {
    totalQuestions: { type: Number, required: true },
    answeredQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    wrongAnswers: { type: Number, required: true },
    unansweredQuestions: { type: Number, required: true },
    totalTimeSpent: { type: Number, required: true },
    timeSpentBySubject: { type: Object, required: true },
    timeSpentOnCorrectAnswers: { type: Number, required: true },
    timeSpentOnWrongAnswers: { type: Number, required: true },
    visitedQuestions: { type: Number, required: true },
    markedForReview: { type: Number, required: true },
  },
});

module.exports = mongoose.model("AttemptedTest", AttemptedTestSchema);
