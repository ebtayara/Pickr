import './PhotoCard.css';

const PhotoCard = ({photo}) => {
    return (
    <div className='img_container'>
        <img className='img' src={photo.image_url}></img>
        <div className='btn_container'>
            <button className='edit_btn' type="submit">Edit</button>
            <button className='delete_btn' type="submit">Delete</button>
        </div>
    </div>
    )
};

export default PhotoCard;
