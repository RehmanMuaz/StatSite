import {
    Typography,
    Space,
  } from 'antd';

export function JSONText(data) {
    return(
        <Space direction="vertical">{console.log("Color:", data["data"]["color"])}
            <Typography.Title className={data["data"]["color"]}>{data["data"]["zone"]}</Typography.Title>
            {
                data["data"]["data"].map((section) =>
                    <Space direction="vertical">
                        <Typography.Title level={3}>{section["title"]}</Typography.Title>
                        { 
                            section["desc"].map((desc) => <Space direction="vertical"><Typography.Text>{desc["text"]}</Typography.Text><Typography.Text className="subtext" type="secondary">{desc["subtext"]}</Typography.Text></Space>)
                        }
                    </Space>
                )
            }

        </Space>
    )
}