import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String, 
            required: true 
        },
        options: [
            { 
                type: String, 
                required: true 
            }
        ],
        correctOption: { 
            type: Number, 
            required: true 
        },
        examType: { 
            type: String, 
            required: true 
        },
        subject: { 
            type: String, 
            required: true 
        },
        sectionPhysics: { 
            type: String 
        },
        sectionChemistry: { 
            type: String 
        },
        sectionMathematics: { 
            type: String 
        },
        difficulty: { 
            type: String, 
            required: true 
        },
        year: { 
            type: String, 
            default: "not applicable" 
        },
        languageLevel: { 
            type: String, 
            required: true 
        },
        solutionMode: { 
            type: String, 
            required: true 
        },
    },
    { 
        timestamps: true 
    }
);

questionSchema.plugin(mongooseAggregatePaginate);

export const Question = mongoose.model("Question", questionSchema);
