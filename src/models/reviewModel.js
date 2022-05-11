const mongoose =require("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId
const reviewSchema= new mongoose.Schema({

        bookId: {type:ObjectId, 
        required:"Book Id is required",
         ref: 'Book'
        },

        reviewedBy: {type:String, 
            required:"reviewedBy is required",
             default:'Guest', 
             value: reviewer
            },

         reviewedAt: {type:Date,
            required: true,
            default:Date.now()
            },

        rating: {type:number,
            minlength: 1,
            maxlength: 5, 
            required:"rating is required"
        },

        review: {type:String, 
           default:optional
            },

        isDeleted: {type:boolean, 
            default: false
        }
        
},   {timestamps:true})

module.exports = mongoose.model("Review",reviewSchema)
