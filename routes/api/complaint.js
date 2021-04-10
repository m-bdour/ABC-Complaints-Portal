const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const auth = require('../../middleware/auth');

const Complaint = require('../../models/Complaint');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/complaint
// @desc     Create a complaint
// @access   Private
router.post(
  '/',
  auth,
  [
    check('type', 'type is required').not().isEmpty(),
    check('detailes', 'detailes is required').not().isEmpty(),

  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {


      const {
        type,
        detailes
      } = req.body;

      const newComplaint = new Complaint({
        user: req.user.id,
        type,
        detailes,
        status: 'pending'
      });

      const complaint = await newComplaint.save();
      res.json(complaint);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/complaint/all
// @desc     Get all complaint
// @access   Private
router.get('/all', auth, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    // Cheak role
    if (user.role !== 'admin') {
      return res.status(403).json({
        msg: 'Forbidden'
      });
    }

    const complaints = await Complaint.find().sort({
      date: -1
    });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/complaint/
// @desc     Get user complaints
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const mycomplaints = await Complaint.find({
      user: req.user.id
    });
    if (!mycomplaints) {
      return res.status(404).json({
        msg: 'No complaint found'
      });
    }
    res.json(mycomplaints);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/complaint/:id
// @desc     Delete a complaint
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        msg: 'complaint not found'
      });
    }

    // Check user
    const admin = await User.findById(req.user.id);
    if (complaint.user.toString() !== req.user.id) {
      if (admin.role !== 'admin') {

        return res.status(401).json({
          msg: 'User not authorized'
        });
      }
    }

    await complaint.remove();

    res.json({
      msg: 'Complaint removed'
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/complaint/update/:id
// @desc     Update complaint
// @access   Private
router.put('/update/:id', auth, checkObjectId('id'), async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    // Cheak role
    if (user.role !== 'admin') {
      return res.status(403).json({
        msg: 'Forbidden'
      });
    }

    const complaint = await Complaint.findById(req.params.id);
    (!complaint) ? res.status(400).send("invalid Id"): null;

    // update complaint
    complaint.status = req.body.status ? req.body.status : complaint.status;
    complaint.notes = req.body.notes ? req.body.notes : complaint.notes;

    await complaint.save();
    res.json(complaint);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;