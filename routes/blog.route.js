/* Initialize express and router
 Refer blog controller to specify the method per route */
const express = require("express"),
      blogRoute = express.Router(),
      blogController = require("../controllers/blog.controller");

/* Test Route just to display if the API is working
 Verify the health of the API
 If you get nothing or some error, the API is not working */
blogRoute.get("/health", function(req, res, next) {
  res.send({ message: "API is Working" });
});

/* Define Route for the App */
blogRoute.post("/review/createreview", blogController.createReview);
blogRoute.get("/review/all", blogController.getAllReview);
blogRoute.get("/review/:reviewid", blogController.getReview);
blogRoute.get("/review/delete/:reviewid", blogController.deleteReview);
blogRoute.post("/review/createComment", blogController.createComment);

/* Export the module to use blogRoute */
module.exports = blogRoute;