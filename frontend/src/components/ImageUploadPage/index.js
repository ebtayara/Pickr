import React, { useState } from 'react';
import './ImageUploadPage.css';

const ImageUpload = () => {

    //use react hooks to wait for upload
    const [progress, setProgress] = useState('getUpload')
    const [url, setImageURL] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState('')

    //define function invoked below. have it wait for a switch or trigger for each stage of the upload process
    const content = () => {
        switch(progress){
            case 'getUpload':
                return <div>upload image</div>
            case 'uploading':
                return <h2>uploading...</h2>
            case 'uploaded':
                return <img src={url} alt='uploaded' />
            case 'uploadError':
                return (
                    <>
                        <div>Error = {errorMessage}</div>
                        <div>upload image</div>
                    </>
                )
        }
    }
    return (
        <div className = "ImageUpload">
            <h1>Upload Your Photos</h1>
            {content()}
        </div>
    )
}

export default ImageUpload;
