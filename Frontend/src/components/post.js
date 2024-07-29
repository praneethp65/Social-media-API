
import { useParams } from 'react-router-dom';

function Post(props) {
    let { id } = useParams();
    return (
        <>
        <h1>Post ID: {id}</h1>
        <p>View each post here</p>
        </>
    );
}

export default Post;