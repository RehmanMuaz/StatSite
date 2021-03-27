import React, { useState } from 'react';
import {
    Progress,
    Timeline,
    Steps,
    Card,
    Row,
    Col,
    Divider,
    Statistic,
    Typography,
	Skeleton,
	Spin,
	Tabs,
  } from 'antd';
  
import {
    ArrowUpOutlined,
    ArrowDownOutlined, 
	LoadingOutlined,
  } from '@ant-design/icons';
  
import { BasicLineChart, BarrierLineChart} from './Chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import { FetchData } from '../Functions/FetchData';
import { JSONText } from '../Functions/TextProcessing';


export function DataPage() {
    const [current, setCurrent] = useState(0);
    const { data, loading } = FetchData(
      'https://api.opencovid.ca/timeseries?stat=active_cases&loc=ON'
    );

	const content = require('../data.json');
    
  
    const onChange = (val) => {
      console.log('onChange:', val);
      setCurrent(val);
    };
  
    const ProgressCircle = ({value}) => (
        <>
        <Progress
            type="circle"
            strokeColor={{
            '0%': '#feff00',
            '100%': '#ff5900',
            }}
            percent={value}
        />
        </>
    );

	const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const { Step } = Steps;
    const mode = 'left';

    return(
        <div>
            <Row justify="start" gutter={[16, 16]} className="card-row-container">
              <Col>
                <Card title="Mortality Rate" className="card-row-small">
					{loading ? <Spin indicator={spinner} /> : <ProgressCircle value={((data.active[data.active.length - 1]["cumulative_deaths"] / data.active[data.active.length - 1]["cumulative_cases"])*100).toFixed(2)} />}
                </Card>
              </Col>
              <Col>
                <Card title="Vaccination Progress" className="card-row-small">
				{loading ? <Spin indicator={spinner} /> : <ProgressCircle value={(data.avaccine[data.avaccine.length - 1]["cumulative_avaccine"] / 14570000).toFixed(2)} />}
                </Card>
              </Col>
              <Col>
                <Card title="Today" className="card-row-small">
				{loading ? <Spin indicator={spinner} /> :
                  	<Statistic title="Cases" value={data.cases[data.cases.length-1]["cases"]}/>
				}
                  <Divider />
				  {loading ? <Spin indicator={spinner} /> :
				  <Statistic
                    title="Change"
                    value={Math.abs(data.cases[data.cases.length-1]["cases"]-data.cases[data.cases.length-2]["cases"])}
                    valueStyle={data.cases[data.cases.length-1]["cases"]-data.cases[data.cases.length-2]["cases"] > 0 ? {  color: '#cf1322' } : {  color: '#3f8600' }}
                    prefix={data.cases[data.cases.length-1]["cases"]-data.cases[data.cases.length-2]["cases"] > 0 ?  <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                  />}
                </Card>
              </Col>
              <Col>
                <Card className="card-row-small">
                  <Statistic
                    title="Daily Cases"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                  <Divider />
                  <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Daily Cases">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.cases} x={'date_report'} y={'cases'} />
                  )}
                  </Card>   
              </Col>
              <Col className="chart-large flex1" >    
                <Card title="Active Cases">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.active} x={'date_active'} y={'active_cases'} />
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-larger noflex" >    
                <Card title="Active Cases Change">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BarrierLineChart data={data.active} x={'date_active'} y={'active_cases_change'} barrier={0}/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Daily Vaccination" >    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.avaccine} x={'date_vaccine_administered'} y={'avaccine'} className="chart-base-height"/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Total Vaccination">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.avaccine} x={'date_vaccine_administered'} y={'cumulative_avaccine'}/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large noflex" >    
                <Card title="Recovery" >    
                  {loading ? (<Skeleton />
                  ) : (
						<AreaChart
							width={600}
							height={300}
							data={data.active}
							margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
							ticks: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey='date_active' />
							<YAxis />
							<Tooltip />
							<Area type="natural" dataKey='cumulative_recovered' stackId="1" stroke="#1890ff" fill="#1890ff" />
							<Area type="natural" dataKey='cumulative_deaths' stackId="1" stroke="#F4664A" fill="#F4664A" />
						</AreaChart>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Daily Deaths">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.mortality} x={'date_death_report'} y={'deaths'} col={1}/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Total Deaths">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.mortality} x={'date_death_report'} y={'cumulative_deaths'} col={1}/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Daily Testing">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.testing} x={'date_testing'} y={'testing'} col={0}/>
                  )}
                  </Card>   
              </Col>
			  <Col className="chart-large flex1" >    
                <Card title="Total Tests Conducted">    
                  {loading ? (<Skeleton />
                  ) : (
                    <BasicLineChart data={data.testing} x={'date_testing'} y={'cumulative_testing'} col={0}/>
                  )}
                  </Card>   
              </Col>
            </Row>
            <Divider />
            <Card title="Timeline">
              <Steps
                type="navigation"
                size="default"
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
              >
                <Step title="Setup" description="This is a description." />
                <Step title="Development" description="This is a description." />
                <Step title="Deployment" description="This is a description." />
              </Steps>
            </Card>
            <Card>
              <Timeline mode={mode}>
                <Timeline.Item label="2015-09-01">step1</Timeline.Item>
                <Timeline.Item label="2015-09-01">step2</Timeline.Item>
                <Timeline.Item label="2015-09-01">step3</Timeline.Item>
                <Timeline.Item label="2015-09-01">step4</Timeline.Item>
              </Timeline>
            </Card>
			<Divider/>
			<Card>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="Lockdown" key="1">
					<JSONText data={content.info[0]}/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Control" key="2">
				<JSONText data={content.info[1]}/>
				</Tabs.TabPane>				
				<Tabs.TabPane tab="Restrict" key="3">
				<JSONText data={content.info[2]}/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Protect" key="4">
				<JSONText data={content.info[3]}/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Prevent" key="5">
				<JSONText data={content.info[4]}/>
				</Tabs.TabPane>
			</Tabs>
            </Card>
        </div>
      )
    }
  
  