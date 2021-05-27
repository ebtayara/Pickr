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

//another action for deleting the photo?

//thunk to upload
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
//thunk that puts image on the page
export const getPhotos = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${userId}`)
    const photos = await res.json();
    dispatch(setPhotos(photos))
};
//thunk that fetches from edit route using the setPhoto action
export const editPhoto = (photoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${photoId}`, {
        method: "PUT"
    });
    const photo = await res.json();
    dispatch(setPhoto(photo));
};
//thunk for delete route
export const deletePhoto = (photoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${photoId}`, {
        method: "DELETE"
    });
    const photos = await res.json();
    dispatch(setPhotos(photos));
};

//reducer
const imagesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        //how do I incorporate my edit thunk here? return all photos before calling setPhotos again
        case Upload:
            newState = {...state};
            newState[action.photo.id] = action.photo;
            return newState;
        case GetPhotos:
            newState = {...state};
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            });
        //new case for delete which I set to null?
            return newState;
        default:
        return state;
    }
};

export default imagesReducer;
