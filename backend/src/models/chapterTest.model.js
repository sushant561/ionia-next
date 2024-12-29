import mongoose, {Schema} from "mongoose";

const chapterQuestionSchema = new Schema(
    {
        chapterName: {
            type: String,
            required: true
        },
        questions:[ 
            {
                type: Schema.Types.ObjectId,
                ref: "Question"
            }
        ]
    },
    {
        timestamps: true
    }
)

export const ChapterQuestion = mongoose.model("ChapterQuestion", chapterSchema);