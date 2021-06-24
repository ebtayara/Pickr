import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom';
import {getComments, createComment, editComment, removeComment} from '../../store/comments';
import './Comments.css';

