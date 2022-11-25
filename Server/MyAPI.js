var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(5557, function () {
  console.log("Server is running....");
});
const { db } = require("./config/admin");

//Api
app.get("/api/Courses", async (req, res) => {
  // res.status(201).json(items)
  const courseRef = db.collection("Courses");
  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/item", async (req, res) => {
  const { name, price, img } = req.body;

  try {
    const body = db.collection("Courses").doc();

    const item = {
      // pdid: Math.round(Math.random() * 10 + 1).toString(),
      name: name,
      price: price,
      img: img,
     
    };
    console.log("add", item);

    body.set(item);

    res.status(200).send({
      message: "successful",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.put("/update/:docId", async (req, res) => {
  const { name, price, img } = req.body;

  try {
    const docId = req.params.docId;
    const body = db.collection("Courses").doc(docId);

    const item = {
      name: name,
      price: price,
      img: img,
    
    };
    console.log("update", item);

    body.update(item);

    res.status(200).send({
      message: "successful",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete("/del/:docId", async (req, res) => {
  try {
    const docId = req.params.docId;
    db.collection("Courses").doc(docId).delete();
    res.status(200).send({
      message: "successful",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
