const express = require('express');
const router = express.Router();

const { 
    getAuthors, 
    newAuthor , 
    getSingleAuthor , 
    updateAuthor , 
    deleteAuthor,
} = require('../controllers/authorController');

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/authors').get(getAuthors);
router.route('/author/:id').get(getSingleAuthor);
router.route('/admin/author/new').post(isAuthenticatedUser,authorizeRoles('admin'),newAuthor);
router.route('/admin/author/:id')
    .put(isAuthenticatedUser,authorizeRoles('admin'), updateAuthor)
    .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteAuthor);

module.exports = router;