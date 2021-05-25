const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//middleware to check and validate keys
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    "/",
    //should be able to access the image file in my request under the key of file - req.file
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const profileImageUrl = await singlePublicFileUpload(req.file);
        const user = await User.signup({
            username,
            email,
            password,
            profileImageUrl,
        });

        setTokenCookie(res, user);

        return res.json({
            user,
        });
    })
);

module.exports = router;
