const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
const TodosModel = require("../model/TodoModel");
const bcrypt = require('bcrypt')
const sec = "secryyyyyyyyyyyyyyyyyyssssssssssssset";

exports.signupUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        error: " Already Exists User",
      });
    }
    const newUser = new UserModel();
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    await newUser.save();
    return res.status(200).json({
      message: "User created successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.loginApi = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const Userfind = await UserModel.findOne({email: email });
     if (!Userfind) {
         return res.status(404).json({
             message: "Please check your email and password",
         });
     }
     let result = await bcrypt.compare(password, Userfind.password);
    if (result) {
      const token = jwt.sign({email},sec );

      return res.status(200).json({
        message: "login successful",
        token,
      });
    } else {
        return res.status(401).json({
            message: "Incorrect password",
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createTodos = async (req, res) => {
    let email = req.email;
    const findUser = await UserModel.findOne({
        email,
    });
    if (!findUser) {
        return res.status(404).json({
        message: "Error while getting User Email",
        });
    }
    const newtodo = new TodosModel();
    newtodo.title = req.body.title;
    newtodo.priority = req.body.priority;
    newtodo.discription = req.body.discription;
    newtodo.status = req.body.status;
    await newtodo
    .save()
    .then(async (result) => {
      findUser.TodosArray.push(result._id);
      await findUser.save();
      newtodo.UserArray.push(findUser._id);
      await newtodo.save();
      return res.status(200).json({
        message: "Todo has been Added Successfuly ",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        message: "Error",
        err,
      });
    });
};

exports.getTodos = async (req, res) => {
    let email = req.email;
    try {
        const users = await UserModel.find({
            email
        });
        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const TodosArray = users[0].TodosArray;
        const result = await TodosModel.find({
            _id: {
                $in: TodosArray
            }
        }).sort({
            priority: -1
        })

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving todos"
        });
    }
};



exports.deleteTodos = async (req, res) => {
    try {
        const idparam = req.params.id;
        if (!idparam) {
            return res.status(400).json({
                message: "Todo id is Missing"
            });
        }
        const deletionResult = await TodosModel.deleteOne({
            _id: idparam
        });

        if (deletionResult) {
            return res.status(200).json({
                message: "Delete todos Successful"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
};

exports.updateTodos = async (req, res) => {
    try {
        const idparam = req.params.id;
        if (!idparam) {
            return res.status(400).json({
                message: "Todo ID is missing"
            });
        }
        const updatedTodo = await TodosModel.findOneAndUpdate({
            _id: idparam
        }, {
            $set: req.body
        }, {
            new: true
        });

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            message: "Update successful",
            todo: updatedTodo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

// filter record based on status 
exports.filterRecord = async (req, res) => {
    try {
        let email1 = req.email
        const query = req.query.search;
         const users3 = await UserModel.find({
             email1,
         })
         const TodosArray = users3[0].TodosArray

        const result = await TodosModel.find({
            _id: {
                $in: TodosArray
            },
            status:{
                $regex: query,
                $options: "i"
            }
        });
        if (result) {
            return res.status(200).send(result)
        } else {
            return res.status(404).json({
                message: "No Record found "
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


