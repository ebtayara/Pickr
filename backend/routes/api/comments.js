const express = require('express')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { User, Photo, Comment } = require('../../db/models');
const router = express.Router();


