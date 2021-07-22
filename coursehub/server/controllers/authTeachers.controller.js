
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const students = prisma.student;
const bcrypt = require('bcrypt');

//bcrypt is a synchronous lybrary so we need to use async to hash our password in best way
exports.signUp = async (req, res) => {
  try {




    //here we create the salt and hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    console.log(hashedPassword);






    //that's the user we gonna add to the data base
    const user = {
      email : req.body.email,
      userName : req.body.userName,
       password : hashedPassword,
       education : req.body.education,
       age : req.body.age,
       wallet : req.body.wallet,
       image : req.body.image,
   
    };





    //here we are going to check if the user we trying to create already exist or not 
    
 students.findUnique({
      where :{userName : req.body.userName}
    })


    .then(data => {
      console.log("bro you reached findunique!",data)

    

      //if we didn't findany user with the same userName 
      if (!data) {
        console.log("its getting to the find unique")
              students.create({data: user})




                .then(data => {
                   res.send(data)
                   console.log("bro good job you created user !",data)
                    })
                    .catch(err => {
                     console.log(err,"something werong")
                   res.status(500).send({
                   message: "Error creating sudents" 
                     });
                     });
 
                  }
                else {
                    console.log("this user already exist")
                  res.status(500).send({
                  message: "user already exist" 
                   });
                 }
                    })
    .catch(err => {
      console.log(err,"something werong")
      res.status(500).send({
        message: "Error creating sudents" 
      });
    });

  } catch (error) {
    console.log(error,"something werong")
    res.status(500).send(error)
  }


  };










  //now we take care of the singin part to make sure the user who trying to log in has the the same data 



  exports.logIn =  (req, res) => {

    //that's the username and password the the user typed 
    const user = {
      userName: req.body.userName,
      password: req.body.password
    };


     students.findUnique({
  where:{userName: req.body.userName}
})
.then( async data => {
  const validPassword = await bcrypt.compare(user.password, data.password);

  if (validPassword) {
    console.log('the password matches')
    res.status(201).send({
      message: "the password is correct" 
    })  }
  else if (!validPassword){
    console.log('the password does not match')
    res.status(201).send({
      message: "the password is incorrect" 
    })

  }

})
.catch(async err =>{
 await res.status(500).send({
    message: "Error finding the sudents" 
  })}
)


  }