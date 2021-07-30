
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const students = prisma.student;
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)



exports.buyPoints = async (req,res) => {
let {amount,id,email} = req.body;
let pointsAmount = 0;

try {
    const payment = await stripe.paymentIntents.create({
        amount,
        currency : "USD",
        description : "buying points !",
        payment_method : id,
        confirm : true,
    })




          res.json({
            message : "Payment successful",
            success : true,
        })
      
     
   
} catch (error) {
    
}
};



exports.getOldBalence = async(req, res) => {

  let {email} = req.body;
  await students.findUnique({where: {email: req.body.email}})
  .then(response=>{
    console.log("thats the user youre loooking for",response)
    res.send(response)
  })
  .catch(error =>{
    console.log(error)
  })
}

exports.setNewBalence = async(req, res) =>{
  console.log(req.body,"whole body")
  let {id,newWallet} = req.body;


  students.update({
    where: {student_id : id}
    ,
    data: {wallet:newWallet}
  })
  .then((response) =>{
    res.send(response)
  })
  .catch((error) =>
  {
    console.log(error)
  })

}

