import {csrfFetch} from './csrf';

//type
const Upload = "photos/upload"
const GetPhotos = "photos/get"
//action
const setPhoto = (photo) =>(
    {type:Upload, photo}
    );

const setPhotos = (photos) =>(
    {type:GetPhotos, photos}
);

//thunk
export const uploadImage = (photo, userId) => async(dispatch) => {
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("userId", userId);
    const res = await csrfFetch('/api/images', {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const image = await res.json();
    dispatch(setPhoto(image));
};

export const getPhotos = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${userId}`)
    const photos = await res.json();
    dispatch(setPhotos(photos))
};

//reducer
const imagesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case Upload:
            newState = {...state};
            newState[action.photo.id] = action.photo;
            return newState;
        case GetPhotos:
            newState = {...state};
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            });
            return newState;
        default:
        return state;
    }
};

export default imagesReducer;
