// import React, { useState } from 'react';
// import ImageUploader from 'react-images-upload';
// import './ImageUploadPage.css';

// const Upload = props => (
//     <form>
//         <label>
//             File URL:
//             <input id='urlInput' type='text' onChange={props.onUrlChange} value={props.url}></input>
//         </label>
//         <ImageUploader
//             key='image-uploader'
//             withIcon={true}
//             singleImage={true}
//             withPreview={true}
//             label="max size: 5MB"
//             buttonText='choose image'
//             onChange={props.onImage}
//             imgExtensions={['.jpg', '.png', '.jpeg']}
//             maxFileSize={5242880}></ImageUploader>
//     </form>
// )

// const ImageUpload = () => {

//     //use react hooks to wait for upload
//     const [progress, setProgress] = useState('getUpload')
//     const [url, setImageURL] = useState(undefined)
//     const [errorMessage, setErrorMessage] = useState('')
//     //anytime url is changed in file url input, it will trigger function in getUpload case and set image url to w/e we type
//     const onUrlChange = e => {
//         setImageURL(e.target.value)
//     }
//     //we do the same for when an image is selected
//     const onImage = async (invalidImage, validImage) => {
//         if (!url) {
//             console.log('no Url')
//             setErrorMessage('no Url found')
//             //set state
//             setProgress('uploadError');
//             return
//         }
//     //this should upload image
//         setProgress('uploading')
//         try {
//             console.log('validImage', validImage)
//             //need to figure out how to retrieve image from AWS

//         } catch (error) {
//             console.log('error', error);
//             setErrorMessage(error.message);
//             setProgress('uploadError')
//         }
//     }

//     //define function invoked below. have it wait for a switch or trigger for each stage of the upload process
//     const content = () => {
//         switch(progress){
//             case 'getUpload':
//                 return <Upload onUrlChange={onUrlChange} onImage={onImage} url={url}/>
//             case 'uploading':
//                 return <h2>uploading...</h2>
//             case 'uploaded':
//                 return <img src={url} alt='uploaded' />
//             case 'uploadError':
//                 return (
//                     <>
//                         <div>Error = {errorMessage}</div>
//                         <div>upload image</div>
//                     </>
//                 )
//         }
//     }
//     return (
//         <div className = "ImageUpload">
//             <h1>Upload Your Photos</h1>
//             {content()}
//         </div>
//     )
// }

// export default ImageUpload;
