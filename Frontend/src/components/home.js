import {Input} from 'antd';
import { PageHeader} from '@ant-design/pro-layout';
import PostGrid from './postgrid';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="FACEGRAM"
            subTitle="Welcome to Facegram, the newest social media app."/>
        </div>  
        <PostGrid />
      </div>
    </>  
  );
}

export default Home;