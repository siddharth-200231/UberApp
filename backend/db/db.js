const mongoose = require ('mongoose')
function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log(" 🗄️  MongoDB connected successfully")
    }).catch((e)=>{
        console.log(e)
    })
}
module.exports=connectToDb