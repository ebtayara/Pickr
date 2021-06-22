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
    if (res.ok) {
    const image = await res.json();
    dispatch(setPhoto(image));
    }
};
//thunk that puts image on the page
export const getPhotos = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${userId}`)
    const photos = await res.json();
    dispatch(setPhotos(photos))
};
//thunk that fetches from edit route using the setPhoto action
export const editPhoto = (photo, photoId) => async(dispatch) => {
    const formData = new FormData();
    formData.append("image", photo);
    const res = await csrfFetch(`/api/images/${photoId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData,
    });
    if (res.ok) {
    const image = await res.json();
    dispatch(setPhoto(image));
    }
};
//thunk for delete route
export const deletePhoto = (photoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/images/${photoId}`, {
        method: "DELETE"
    });
    if (res.ok) {
    const photos = await res.json();
    dispatch(setPhotos(photos));
    }
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
            newState = {};
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            });
            return newState;
        default:
        return state;
    }
};

export default imagesReducer;
