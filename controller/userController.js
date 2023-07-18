//import the model in controller
const User = require('../model/userModel')


// in mvc architecture if view is integrated ,view contains frontend ,we have to establish connection between view and controller ,that is done with response.render (res.resnder method) . after establishing connectivity it help us to read the data and to send response to frontend from backend


const userController = {
    index:(req,res)=>{
     res.render('index.ejs')
    },
    /* it is used to render(display) the views and help us to recieve the request + data and sending response to the view */
    new:(req,res)=>{
     res.render('create.ejs')
    },
    edit:(req,res)=>{
     res.render('edit.ejs')
    },

    // we create a new controller to handle the incoming data from the front end
    // api controller-> post request
    newUser: async (req,res)=>{
         try {
            const newUser =  req.body 
          const extEmail = await User.findOne({email:newUser.email})
          if(extEmail)
          res.status(401).json({msg:`${newUser.email}already exists.`})
          
          const extMobile = await User.findOne({mobile:newUser.mobile})
          if(extMobile)
          res.status(401).json({msg:`${newUser.mobile}already exists.`})
          await User.create(newUser)



            return res.status(200).json({msg:`User created successfully`,newUser})

            
         } catch (err) {
            console.log(err) // exception handling
         }
    },
    readUser:async(req,res)=>{
try {
   let users = await User.find()
   res.status(200).json({length:users.length,users})
   
} catch (err) {
   //500->internal server error
   //200->status ok
   //401->unautorised req
   //400-> bad request
   //404->path not found
   //505->server not found
    return res.status(500).json({msg:err.message})
}
    },
    readSingleUser:async(req,res)=>{
      try {
         let id = req.params.id //ref id from router params
         let single = await User.findById({_id:id})
         if(!single)
         return res.status(404).json({msg:`Requested user id not found`})
         return res.status(200).json({user : single})
         
      } catch (error) {
         return res.status(500).json({msg:err.message})
      }
    },
    updateUser:async(req,res)=>{
      try {
         let id = req.params.id // read id from router params
         const data = req.body

         let extUser = await User.findById({_id:id})
         if(!extUser)
         return res.status(404).json({msg:`Requested user id not found`})

         await User.findByIdAndUpdate({_id:id},data)
         return res.status(200).json({msg:`user data updated successfully`})
         
      } catch (err) {
         return res.status(500).json({msg:err.message})
      }

    },
    deleteUser:async(req,res)=>{
         try {
            let id = req.params.id 
            let extUser = await User.findById({_id: id})
            if(!extUser)
            return res.status(404).json({msg:`Requested user id doesnt found`})
            await User.findByIdAndDelete({_id:id})
            return res.status(200).json({msg:`User data deleted successfully`})
            
         } catch (err) {
            return res.status(500).json({msg:err.message})
         }
    },
    pnf:(req,res)=>{
     res.render('pnf.ejs')
    },

    // index , new,pnf and edit are view controllers , we need to use get request for these in route
    
 }
 
 module.exports = userController


           //  model -> controller <-view
           //               |
           //             route
           //               |
           //              server <- db