import React from 'react';
import { Line, Gauge } from '@ant-design/charts';

function sortJson(object, a, b) {
  var out = [];
  for(let obj of object)
  {
    let res = {};
    res[a] = obj[a];
    res[b] = obj[b];
    out.push(res);
  }
  return out;
}

export function BasicLineChart({data, x, y, height, col}) {
	let customCol = 0;
	if(col == 0 || col == null){
		customCol = "#1890ff";
	}
	else
	{
		customCol = "#F4664A";
	}

  let customHeight = 300;
	if(height == 0 || height == null){
		customHeight = 300;
	}
	else
	{
		customHeight = height;
	}

    const config = {
      	data,
        height: customHeight,
        xField: x,
        yField: y,
        legend: { position: 'top' },
        smooth: true,
        xAxis: { tickCount: 5 },
        slider: {
          start: 0,
          end: 1,
        },
        animation: {
          appear: {
            animation: 'path-in',
            duration: 2000,
          },
        },
		color: customCol,
      };
    return(
        <Line {...config} />
    )
  
}


export function BarrierLineChart({data, x, y, barrier}) {
  const config = {
      data,
      height: 300,
      xField: x,
      yField: y,
      legend: { position: 'top' },
      smooth: true,
      color: '#F4664A',
      annotations: [
        {
          type: 'regionFilter',
          start: ['min', barrier],
          end: ['max', '-10000'],
          color: '#1890ff',
        },
        {
          type: 'text',
          position: ['min', 'median'],
          content: 'Zero',
          offsetY: -4,
          style: { textBaseline: 'bottom' },
        },
        {
          type: 'line',
          start: ['min', barrier],
          end: ['max', barrier],
          style: {
            stroke: '#F4664A',
            lineDash: [2, 2],
          },
        },
      ],
      animation: {
        appear: {
          animation: 'path-in',
          duration: 2000,
        },
      },
    };
  return(
      <Line {...config} />
  )
}

export function CustomGuage({value})
{
  var config = {
    width: 300,
    percent: value,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#30BF78', '#FAAD14', '#F4664A'],
    },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      content: {
        style: {
          fontSize: '36px',
          lineHeight: '36px',
        },
      },
    },
  };
  return <Gauge {...config} />;
}