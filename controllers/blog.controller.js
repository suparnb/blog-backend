/* Initialize redis and create connection */
const config = require("./../configuration/env");
const Redis = require("ioredis");
client = new Redis(config.REDIS_PORT, config.REDIS_SERVER);
var uuid = require('uuid');

module.exports = {
  /* Methods :
  1. Create a Review
  2. Get all Reviews
  3. Get a specific Review
  4. Delete a Review
  5. Add Comment */
  
  /* Create Review */
  createReview: (req, res) => {
     const reviewId = "rev-" + uuid.v4();
      try {
        var reviewPost = JSON.stringify({ 
          "id": reviewId, 
          "title": req.body.title, 
          "content": req.body.content, 
          "author": req.body.author });
          
        client.set(reviewId, reviewPost);
        res.send("Review created Successfully");
      } catch (err) {
        res.send("Error creating review");
      }
  },

  /* View All Review */
  getAllReview: async (req, res) => {
    try {
      var promises = [];
      await client.keys('rev-*').then(function (keys) {
        keys.forEach((key) => {
          var promise = client.get(key);
          promises.push(promise);
        });
      });

      const response = await Promise.all(promises).then((result) => {
        res.send(result);
      });
    } catch (err) {
      res.send("Error getting review");
    }
  },
  
  /* View Review Details */
  getReview: async (req, res) => {
    const id = req.params.reviewid;
    try {
      res.send(await client.get(id));
    } catch (err) {
      res.send("Error getting review");
    }
  },

  /* Delete review */
  deleteReview: (req, res) => {
    try {
      client.del(req.params.reviewid, (err, reply) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Review deleted successfully" });
        }
      });
    } catch (err) {
      res.send("Error deleting review");
    }
  },
  
  /* Create Comment */
  createComment: (req, res) => {
      try {
        const reviewId = req.body.id;
        client.exists(reviewId).then(() => {
          client.del(reviewId);
          
          // var reviewPost = JSON.stringify({ 
          //   "id": ("com-" + uuid.v4()), 
          //   "text": req.body.text,
          //   "name": req.body.name,
          //   "reviewid": reviewId,
          //   "title": req.body.title, 
          //   "content": req.body.content, 
          //   "author": req.body.author });
          req.body.comid = "com-" + uuid.v4();
          var reviewPost = JSON.stringify(req.body);
          
          client.set(reviewId, reviewPost);
          res.send("Comment added Successfully");
        });

      } catch (err) {
        res.send("Error creating comment");
      }
  }
};