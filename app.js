require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const UserRoute = require("./src/routes/user.route");
const PostRoute = require("./src/routes/post.route");
const requireLogin = require("./src/middleware/requireLogin");
const cors = require("cors");

require("./src/db/db");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(UserRoute);
app.use(PostRoute);

app.use("/image/profile", express.static("./src/images/profile"));
app.use("/image/post", express.static("./src/images/post"));

//testing requiredLogin middleware
app.use("/test", requireLogin, (req, res) => {
  res.send({ message: "success" });
});

app.listen(port, () => {
  console.log("server listening on port :" + port);
});
