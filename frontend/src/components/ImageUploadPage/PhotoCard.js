const PhotoCard = ({photo}) => {
    return (
    <div>
        <img src={photo.image_url}></img>
        <button type="submit">Edit</button>
        <button type="submit">Delete</button>
    </div>
    )
};

export default PhotoCard;
