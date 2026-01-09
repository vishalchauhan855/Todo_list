

const express = require("express");
const crypto = require("crypto");
const PORT =process.env.PORT || 5000;
const app = express();
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded());



app.get("/", (req, res) => {
  res.send("server running");
});


let arr = [];


app.get("/api/user", (req, res) => {
  if (arr.length === 0) {
    return res.send({
      success: false,
      message: "no records"
    });
  }

  res.send({
    success: true,
    records: arr
  });
});

app.get("/api/user/:id", (req, res) => {
  const user = arr.find(ele => ele.id === req.params.id);
  
  if (!user) {
    return res.send({
      success: false,
      message: "user not exist"
    });
  }

  res.send({
    success: true,
    records: user
  });
});


app.post("/api/user", (req, res) => {
  const { name, email, age } = req.body;
if (!name || !email || !age ) {
  return res.send({ success: false, message: "All fields are required" });
}

  arr.push({id: crypto.randomUUID(),name,email,age});

  res.send({
    success: true,
    message: "user added"
  });
});

app.delete("/api/user/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(req.params.userId)
  const userExist = arr.find(ele => ele.id === userId);
  if (!userExist) {
    return res.send({
      success: false,
      message: "user not exist"
    });
  }
  const filterData = arr.filter(ele => ele.id !== userId);
  arr = filterData;

  
  res.send({
    success: true,
    message: "user has been deleted"
  });
});

app.put("/api/user", (req, res) => {
  const { id } = req.query;
  const { name, email, age } = req.body;

  const index = arr.findIndex(ele => ele.id === id);

  if (index  === -1) {
    return res.send({
      success: false,
      message: "user not exist"
    });
  }

  arr[index] = {id,name,email,age};

  res.send({
    success: true,
    message: "user updated"
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));