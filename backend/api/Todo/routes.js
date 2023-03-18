'use strict';
const router = require('express').Router();
const Controller = require('./controller');

router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/create', Controller.create);
router.put('/update/:id', Controller.update);
router.delete('/delete/:id', Controller.remove);

module.exports = router;
