import './App.css';
import 'antd/dist/antd.css';

import logo from './logo.svg';
import { Layout, Menu, Breadcrumb } from 'antd';

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { DataPage } from './Components/DataPage';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
	return (
		<Layout>
			<header className="header-custom">
				<div className="nav-logo-container">
					<img src={logo} className="App-logo" alt="logo" />
					<b style={{ color: 'white' }}>Covid Canada</b>
				</div>
				<Menu className="fit-content" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
					<Menu.Item key="1">Statistics</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</header>
			<Layout>

				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						{/* Page contents go here*/}
						<DataPage />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default App;

// <Chart data={data.active} x="date_active" y="active_cases" />
