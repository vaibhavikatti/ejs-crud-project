//import the model in controller
const User = require('../model/userModel')





const userController = {
    index:(req,res)=>{
     res.render('index.ejs')
    },
    new:(req,res)=>{
     res.render('create.ejs')
    },
    edit:(req,res)=>{
     res.render('edit.ejs')
    },

    // we create a new controller to handle the incoming data from the front end
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
    pnf:(req,res)=>{
     res.render('pnf.ejs')
    },
    
 }
 
 module.exports = userController


           //  model -> controller <-view
           //               |
           //             route
           //               |
           //              server <- db