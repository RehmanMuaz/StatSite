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
					<b style={{ color: 'white' }}>Covid StatSite</b>
				</div>
			</header>
			<Layout>

				<Layout style={{ padding: '0 24px 24px' }}>
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
