const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const User = require('../../models/User');

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

// @route    put api/admin/id
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
    (user) ? res.status(400).send("invalid Id"): null;
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


module.exports = router;