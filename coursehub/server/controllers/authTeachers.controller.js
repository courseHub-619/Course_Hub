const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const teachers = prisma.teacher;
const weekDay = prisma.weekDay;
const sessions = prisma.sessions;
const bcrypt = require("bcrypt");

//this require is allowing us to use the secret token from the .env file
require("dotenv").config();

//we will require jwt
const jwt = require("jsonwebtoken");

//bcrypt is a synchronous lybrary so we need to use async to hash our password in best way
exports.signUp = async (req, res) => {
  try {
    console.log("ayaaaaaaaaaaaaaaaa", req.body);

    //here we create the salt and hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      req.body.signupdata.password,
      salt
    );
    console.log(hashedPassword);

    console.log("ayaaaaaaaaaaaaaaaa", req.body);

    //that's the user we gonna add to the data base
    const user = {
      email: req.body.signupdata.email,
      userName: req.body.signupdata.userName,
      password: hashedPassword,
      education: req.body.signupdata.education,
      age: req.body.signupdata.age,
      wallet: req.body.signupdata.wallet,
      image: req.body.url,
      Overall_rating: req.body.signupdata.Overall_rating,
      numberOfRates: 0,
      sumOfRates: 0,
      description: req.body.signupdata.description,
      token: req.body.signupdata.email,
    };

    console.log(user, "useesrreererre");

    //here we are going to check if the user we trying to create already exist or not

    teachers
      .findUnique({
        where: { email: req.body.signupdata.email },
      })

      .then((data) => {
        console.log("bro you reached findunique!", data);

        //if we didn't findany user with the same userName
        if (!data) {
          console.log("its getting to the find unique");
          const teacher = teachers
            .create({ data: user })

            .then(async (data) => {
              // now
              await sessions.create({
                data: {
                  one: req.body.one,
                  two: req.body.two,
                  three: req.body.three,
                  four: req.body.four,
                  five: req.body.five,
                  six: req.body.six,
                  teacher_id: Number(data.teacher_id),
                },
              });

              await weekDay.create({
                data: {
                  monday: req.body.monday,
                  tuesday: req.body.tuesday,
                  wednesday: req.body.wednesday,
                  thursday: req.body.thursday,
                  friday: req.body.friday,
                  saturday: req.body.saturday,
                  sunday: req.body.sunday,
                  teacher_id: Number(data.teacher_id),
                },
              });

              res.send(data);
              console.log("bro good job you created user !", data);
            })
            .catch((err) => {
              console.log(err, "something werong");
              res.status(500).send({
                message: "Error creating sudents",
              });
            });
        } else {
          console.log("this user already exist");
          res.status(500).send({
            message: "user already exist",
          });
        }
      })
      .catch((err) => {
        console.log(err, "something werong");
        res.status(500).send({
          message: "Error creating sudents",
        });
      });
  } catch (error) {
    console.log(error, "something werong");
    res.status(500).send(error);
  }
};

//this function is just and expirement to try the authentication and authorization with jwt and has nothing to do with the app itself
exports.trying = (req, res) => {
  const mydata = [
    "aziz",
    "chakchouk",
    "houssem",
    "jerry",
    "3abdallah",
    "elma7roum",
  ];
  res.json(mydata.filter((element) => element === req.user.userName));
};

//now we take care of the singin part to make sure the user who trying to log in has the the same data

exports.logIn = (req, res) => {
  let result;

  //that's the username and password the the user typed
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  teachers
    .findUnique({
      where: { email: req.body.email },
    })
    .then(async (data) => {
      console.log("yooo", data);

      if (!data) {
        return res.send(404);
      }
      //here we will compare the typed password against the one saved in the DATABASe
      const validPassword = await bcrypt.compare(user.password, data.password);

      if (validPassword) {
        const accessToken = generateAccessToken(user);
        //this is how we get our accessToken when we log in
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        //each time we get a token we need to set a refresh token too
        // refreshTokens.push(refreshToken);
        // console.log(refreshTokens);
        console.log(data.token);

        console.log("heres the token", accessToken);
        console.log("heres the email", data.email);

        teachers
          .update({
            where: { email: data.email },
            data: { token: accessToken },
          })
          .then((response) => {
            result = response;
            console.log(result, "ressssssss");
            res.json({
              accessToken: accessToken,
              result: result,

              // refreshToken: refreshToken
            });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        console.log(data.token, "the token");
        console.log("the password matches");
      } else if (!validPassword) {
        console.log("the password does not match");
        res.status(201).send({
          message: "the password is incorrect",
        });
      }
    })

    .catch(async (err) => {
      console.log(err);
      await res.status(500).send({
        message: "Error finding the sudents",
      });
    });
};

//this function will get the token from the requedt header and verify that this person exist so it will keep him loged in

exports.authenticateToken = (req, res, next) => {
  //if the token exst it will come from the header of req
  const authHeader = req.headers["authorization"];
  //here either the token is gonna be undifined or the actual token
  //if it's not undefined thenit will have in the header the word bearer then space then the token so we need to split and get the second one
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  // here we're going to make sure that the token match
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

//refresh token function

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "6d" });
};

//normally we save out refresh tokens in database but for now we just do it locally
//this part need refactor later

// let refreshTokens = [];

//this function for using the refresh token

// exports.token = (req, res)=>{

//   const refreshToken = req.body.token;

//   //we gonna cheack the refresh token
//   if (refreshToken===null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//   //if it pass the above conditions then we can verify
//    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
//           if (err) return res.sendStatus(403)
//           const accessToken = generateAccessToken({userName : user.userName})
//           res.json({
//             accessToken : accessToken
//           })

//    })

// }

//now this is the deauthentication function that will delete accessToken
// exports.logout = (req, res)=>{
// refreshTokens = refreshTokens.filter(token => token !== req.body.token)
// res.sendStatus(204)
// }
