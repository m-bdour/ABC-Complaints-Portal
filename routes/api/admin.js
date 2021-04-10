const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const User = require('../../models/User');
const Complaint = require('../../models/Complaint');

// @route    GET api/admin
// @desc     Get all users
// @access   Private
router.get('/', auth, async (req, res) => {

  const admin = await User.findById(req.user.id);
  // Cheak role
  if (admin.role !== 'superAdmin') {
    return res.status(403).json({
      msg: 'Forbidden'
    });
  }

  const users = await User.find();
  res.json(users);
});

// @route    put api/admin/role/id
// @desc     update user role
// @access   Private
router.put('/:role/:id', [auth, checkObjectId('id')], async (req, res) => {

  const admin = await User.findById(req.user.id);
  // Cheak role
  if (admin.role !== 'superAdmin') {
    return res.status(403).json({
      msg: 'Forbidden'
    });
  }

  const user = await User.findById(req.params.id);

  try {
    // check if exists
    (!user) ? res.status(400).send("invalid Id"): null;
    // update user to admin
    user.role = req.params.role;
    await user.save();
    res.json(user);

  } catch (err) {
    (err.kind == "ObjectId") ? res.status(400).send("invalid Id"):
      console.error(err.message);
    res.status(500).send('Server error');
  }

});

// @route    DELETE api/admin/:id
// @desc     Delete a user account
// @access   Private
router.delete('/:id/:userComplaints', [auth, checkObjectId('id')], async (req, res) => {
  try {

    const admin = await User.findById(req.user.id);
    // Cheak role
    if (admin.role !== 'superAdmin') {
      return res.status(403).json({
        msg: 'Forbidden'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        msg: 'user not found'
      });
    }
    await user.remove();

    console.log(`req.params.userComplaints=:"${req.params.userComplaints}"`);
    console.log(`id=:"${req.params.id}"`);

    if (req.params.userComplaints === "delete") {
      const delRes = await Complaint.deleteMany({
        user: req.params.id
      });
      console.log("delRes=:" + delRes);
    }

    res.json({
      msg: 'user removed'
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


module.exports = router;