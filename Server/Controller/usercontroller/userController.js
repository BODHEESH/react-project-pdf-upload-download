const bcrypt = require("bcrypt");
const { regValidation, loginValidation } = require("../../helpers/validation");
const User = require("../../model/userModel");
const userVerification = require("../../model/verification");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");
let ObjectId = require("mongodb").ObjectId

/* -------------------------------------------------------------------------- */
/*                                email config                                */
/* -------------------------------------------------------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elearningbodhi@gmail.com",
    pass: "bxnheviauygqsfke",
  },
});

/* -------------------------------------------------------------------------- */
/*                                user register                               */
/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  try {
    const result = regValidation.validateSync(req.body);
    const isExists = await User.findOne({ email: result.email });
    if (isExists) {
      throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(result.password, 12);

    const user = User({
      name: result.name,
      email: result.email,
      password: hash,
    });
    await user.save().then(async (result) => {
      sendOtp(result, res);
      res.json({
        msg: "register success",
        user: {
          ...user._doc,
          password: "",
        },
      });
    });

    //init session 

    // res.send({user,message:"Access granted"})
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 user login                                 */
/* -------------------------------------------------------------------------- */

const userLogin = async (req, res) => {
  try {
    const result = loginValidation.validateSync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isBlocked) {
      throw new Error("You are temporarily blocked");
    }

    const privateKey = process.env.USER_JWTSECRET_KEY;
    const auth = await bcrypt.compare(result.password, user.password);
    if (!auth) {
      throw new Error("Incorrect credentials");
    } else {
      jwt.sign({ email: user.email }, privateKey, function (err, token) {
        if (err) {
          console.log(err)
          return res.json({ state: false, msg: "Something went wrong !" });
        } else {
          console.log("Token created : ", token)
          return res.json({ state: "ok", token, user });
        }
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};


/* -------------------------------------------------------------------------- */
/*                                  send OTP                                  */
/* -------------------------------------------------------------------------- */


const sendOtp = async (result, res) => {
  try {
    const OTP = await Math.floor(100000 + Math.random() * 900000).toString();
    console.log(OTP);
    var senEMail = {
      from: "elearningbodhi@gmail.com",
      to: result.email,
      subject: "Sending Email from PDF Gallery ",
      text: `Hi ${result.name} Your OTP pin has been generated`,
      html: ` <h1>Hi ${result.username}</h1><p>Your OTP is ${OTP}</p>`,
    };

    let hashOTP = await bcrypt.hash(OTP, 10);
    let verify = await userVerification.findOne({ userId: result._id });
    if (!verify) {
      const userverification = new userVerification({
        userId: result._id,
        Otp: hashOTP,
        Created: Date.now(),
        Expiry: Date.now() + 100000,
      });
      await userverification.save();
    } else {
      await userVerification.updateOne(
        { userId: result._id },
        { Otp: hashOTP }
      );
    }

    transporter.sendMail(senEMail, function (error, info) {

      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "pending",
          msg: "Verification otp mail sent",
          mail: result.email,
          user: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Verify OTP                                 */
/* -------------------------------------------------------------------------- */

const verifyOtp = async (req, res) => {

  let OtpVerify = await userVerification.findOne({ userId: req.body.user });
  let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp);
  if (correctOtp) {
    await User.updateOne(
      { _id: req.body.user },
      { $set: { verified: "true" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 RESEND OTP                                 */
/* -------------------------------------------------------------------------- */

const resendOTP = async (req, res) => {
  sendOtp(req.body, res).then((response) => {
    res.status(200).json(true);
  });
};





/* -------------------------------------------------------------------------- */
/*                               user dashboard                               */
/* -------------------------------------------------------------------------- */

const userDashboard = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    let arrayCopy = [...currentUser.files];
    if (arrayCopy) {
      return res.json({ state: true, arrayCopy, msg: "uploaded files !" });
    }
  } catch (error) {
    console.log(error);
  }
};


/* -------------------------------------------------------------------------- */
/*                                 user search                                */
/* -------------------------------------------------------------------------- */



// const userSearch = async (req, res) => {
//   try {
//     let data = req.body.search;
//     let id = "63a7ddd376d931be271548a1";


//     let userdata = await User.findOne({ _id: id });

//     console.log(userdata.files, "userdata files");

//     let obj = userdata.files.find(
//       (o) => o.fileName == "System design.pdf1671964812047pdf.pdf"
//     );
//     console.log(obj, "array find method");

//     res.send(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

const userSearch = async (req, res) => {
  try {
    let userId = req.body.userId
    let data = req.body.search
    console.log(userId, 'body');
    console.log(data, 'req.body');

    let searchfound = await User.aggregate([
      { $match: { _id: ObjectId(userId) } },
      { $unwind: "$files" },
      { $match: { "files.fileName": { $regex: '^' + data, $options: 'i' } } },
      {
        $project: {
          files: 1,
          _id: 0
        }
      }
    ])
    console.log(searchfound);
    let target = searchfound[0].files
    return res.json({ msg: "found", target });
  } catch (error) {
    console.log(error);
  }
};



/* -------------------------------------------------------------------------- */
/*                                 upload pdf                                 */
/* -------------------------------------------------------------------------- */

const uploadPdf = async (req, res) => {
  try {

    const userId = req.body.userId;

    const user = await User.findOne({ _id: userId });
    const time = Date.now();

    const pdfFile = {
      time: time,
      fileName: req.file.filename,
    };

    user.files.push(pdfFile);

    await user.save();

    res.status(200).json({ message: "successfully uploaded" });
  } catch (error) {
    console.log(error);
  }
};


/* -------------------------------------------------------------------------- */
/*                                 delete pdf                                 */
/* -------------------------------------------------------------------------- */


// const deletePdf = async (req, res) => {
//   try {
//     console.log(req.params.id)
//     console.log(req.body.id)
//     userId = req.body.id;
//     //  const user = await User.findOne({_id:userId})
//     // console.log(user,"ppp");

//     const pdf = User.updateOne({ _id: userId }, { $pull: { files: { _id: req.params.id } } })
//     console.log(pdf, "uuuuuuu");

//     res.send(pdf);
//   } catch (error) {
//     // console.log(error);
//   }
// };

// /sa
const deletePdf = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.params.id);

  try {
    let userId = req.body.userId
    console.log(userId, 'body');
    let id = req.params.id
    let targetUser = await User.aggregate([
      { $match: { _id: ObjectId(userId) } },
      { $unwind: "$files" },
      { $match: { "files._id": ObjectId(id) } },
      {
        $project: {
          files: 1,
          _id: 0
        }
      }
    ])

    // console.log(targetUser,'targeted user');
    // console.log(targetUser[0].files._id,'delete');
    await User.updateOne({ _id: userId }, {
      $pull: {
        files: { _id: targetUser[0].files._id }
      }
    })
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               user pagination                              */
/* -------------------------------------------------------------------------- */


const userPagination = async (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    // console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

const userLogout = async (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    // console.log(error);
  }
};




module.exports = {
  register,
  userLogin,
  userDashboard,
  userSearch,
  uploadPdf,
  deletePdf,
  userPagination,
  userLogout,
  verifyOtp,
  sendOtp,
  resendOTP,

};