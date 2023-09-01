var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// router.post('/', (req, res, next) => {
//   console.log(req.body);
//   res.json({ message: 'Saved successfully' });
// });


module.exports = router;
