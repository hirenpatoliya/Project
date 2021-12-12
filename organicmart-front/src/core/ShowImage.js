import { API } from '../config';

const ShowImage = ({ item, url }) => (
    <div className="container">
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="image-fluid" style={{ height: '200px', width: '100%' }} />
    </div>
)

export default ShowImage;