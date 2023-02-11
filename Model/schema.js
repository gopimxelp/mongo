const mongooes= require('mongoose')
const Schema=mongooes.Schema

const UserSchema=new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }

})

UserSchema.pre('save',async function(next){
    try{
      next()
    }catch(error){
        next(error);
    }
})


UserSchema.post('save',async function(next){
    try{
      
    }catch(error){
        next(error);
    }
})
const User=mongooes.model('user',UserSchema)
module.exports=User;