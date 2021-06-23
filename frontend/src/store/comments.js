import { csrfFetch } from './csrf'

const LoadComments = 'photos/LoadComments'
const AddComment = 'photos/AddComment'
const UpdateComment = 'photos/UpdateComment'
const DeleteComment = 'photos/DeleteComment'

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


