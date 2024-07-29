import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const grid = (
  <>
  <Row type="flex" justify="space-around">
    <Col span={6}>
    <Link to="/post/1">
      <Card cover={<img alt="test" src="https://picsum.photos/id/237/200/300"/>}>
        <Meta title="First Post" description="Cute dog" />
      </Card>
    </Link>
    </Col>
    <Col span={6}>
    <Link to="/post/2">
      <Card cover={<img alt="test" src="https://picsum.photos/seed/picsum/200/300"/>}>
        <Meta title="Second Post" description="Mountain" />
      </Card>
    </Link>
    </Col>
    <Col span={6}>
    <Link to="/post/3">
      <Card cover={<img alt="test" src="https://picsum.photos/id/1026/400"/>}>
        <Meta title="Third Post" description="This is about something" />
      </Card>
    </Link>
    </Col>
  </Row>
  <br></br> 
  <Row type="flex" justify="space-around">
    <Col span={6}>
    <Link to="/post/4">
      <Card cover={<img alt="test" src="https://picsum.photos/200/300"/>}>
        <Meta title="Fourth Post" description="Seals" />
      </Card>
    </Link>
    </Col>
    <Col span={6}>
    <Link to="/post/5">
      <Card cover={<img alt="test" src="https://picsum.photos/200/300/?blur"/>}>
        <Meta title="Fifth Post" description="Blur image of tea sellers" />
      </Card>
    </Link>
    </Col>
    <Col span={6}>
    <Link to="/post/5">
      <Card cover={<img alt="test" src="Skyline"/>}>
        <Meta title="Sixth Post" description="Skyline" />
      </Card>
    </Link>
    </Col>
  </Row> 
  </>
);

function PostGrid(props) {
  return grid;
}

export default PostGrid;