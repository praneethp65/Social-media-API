import {Layout} from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import Nav from './components/nav';
import Home from './components/home';
import Account from './components/account';
import Post from './components/post';
import Register from './components/register';
import Login from './components/login';


const {Header, Content, Footer} = Layout;

function App() {
  return (
    <Router>
    <Layout className="layout">

      <Header>
        <Nav />
      </Header>

      <Content>
        <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </Content>

      <Footer style={{ textAlign: 'center'}}>Facegram</Footer>
    </Layout>
    </Router>
  );
}

export default App;
