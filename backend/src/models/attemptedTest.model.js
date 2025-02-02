import mongoose, {Schema} from "mongoose";


const attemptedTestSchema = new Schema({
  userId: {  // Reference to the User who took the test
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testId: {  // Reference to the test
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  answers: [
    {
      questionId: {  // Reference to the question
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      answerOptionIndex: {  // The index of the selected answer
        type: Number,
        required: true,
      },
      timeSpent: {  // Time spent on this question in milliseconds
        type: Number,
        default: 0,
        required: true,
      },
    }
  ],
  metadata: {
    totalQuestions: {  // Total number of questions in the test
      type: Number,
      required: true,
    },
    answeredQuestions: [
      {  // List of answered question IDs
        type: Schema.Types.ObjectId,
        ref: 'Question',
      }
    ],
    visitedQuestions: [
      {  // List of visited question IDs
        type: Schema.Types.ObjectId,
        ref: 'Question',
      }
    ],
    markedForReview: [
      {  // List of marked-for-review question IDs
        type: Schema.Types.ObjectId,
        ref: 'Question',
      }
    ],
    selectedLanguage: {  // Language selected for the test
      type: String,
      required: true,
    },
  },
  totalCorrectAnswers: {  // Total number of correct answers
    type: Number,
    default: 0,
  },
  totalWrongAnswers: {  // Total number of wrong answers
    type: Number,
    default: 0,
  },
  totalVisitedQuestions: {  // Total number of visited questions
    type: Number,
    default: 0,
  },
  totalTimeTaken: {  // Total time taken to complete the test in milliseconds
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Post middleware to calculate and update totals after saving an attempt
attemptedTestSchema.post('save', async function() {
  const attemptedTest = this;  // The document that was just saved

  let correctAnswers = 0;
  let wrongAnswers = 0;
  let visitedQuestions = attemptedTest.metadata.visitedQuestions.length;

  // Loop through the answers to calculate correct and wrong answers
  for (const answer of attemptedTest.answers) {
    const question = await mongoose.model('Question').findById(answer.questionId);
    if (question) {
      // Increment correct or wrong based on the selected answer
      if (answer.answerOptionIndex === question.correctOption) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }
  }

  // Update the attemptedTest document with the calculated values
  attemptedTest.totalCorrectAnswers = correctAnswers;
  attemptedTest.totalWrongAnswers = wrongAnswers;
  attemptedTest.totalVisitedQuestions = visitedQuestions;

  // Save the document with the updated totals
});

export const AttemptedTest = mongoose.model('AttemptedTest', attemptedTestSchema);
