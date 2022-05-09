const mongoose=require("mongoose")

const booksSchema =new mongoose.Schema({
      title:{ type:String

      },
})

module.exports=mongoose.model("Book",booksSchema)