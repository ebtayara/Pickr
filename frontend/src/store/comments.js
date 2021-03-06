import { csrfFetch } from './csrf'

//actions
const LoadComments = 'photos/LoadComments'
const AddComment = 'photos/AddComment'
const UpdateComment = 'photos/UpdateComment'
const DeleteComment = 'photos/DeleteComment'

//action creators
const loadComments = (comments) => (
  {type: LoadComments, comments}
);

const addComment = (comment) => (
  {type: AddComment, comment}
);

const updateComment = (comment) => (
  {type: UpdateComment, comment}
);

const deleteComment = (comment) => (
  {type: DeleteComment, comment}
);

//thunks
export const getComments = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${photoId}`)
  if (res.ok) {
      const comments = await res.json()
      dispatch(loadComments(comments))
  }
};

export const editComment = (textfield, commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({textfield})
  })
  if (res.ok) {
      const editedComment = await res.json()
      dispatch(updateComment(editedComment))
  }
};

export const createComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.photoId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
  })
  if (res.ok) {
      const newComment = await res.json()
      dispatch(addComment(newComment))
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
  })
  if (res.ok) {
      dispatch(deleteComment(commentId))
  }
};

//reducer
const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
      case LoadComments: {
          newState = {}
          action.comments.forEach(comment => {
              newState[comment.id] = comment
          });
          // newState.comments2 = [...action.comments]
          return newState
        }
        case AddComment: {
          newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case UpdateComment: {
          newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case DeleteComment: {
          newState = {...state}
            delete newState[action.comment]
            return newState
          // newState = {...state, comment:action.comment}
          //   return newState
        }
        default:
            return state
    }
  };

export default commentsReducer;
