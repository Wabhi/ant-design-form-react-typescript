import React from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

type PanelData = {
  key: string; // Corrected 'number' to string for dynamic panel keys
  label: string | React.ReactNode;
  children: React.ReactNode; // Added children type to support panel content
};

type CustomCollapseType = {
  panels: PanelData[];
};

const CustomCollapse: React.FC<CustomCollapseType> = (props) => {
  const { panels } = props;

  const customExpandIcon = (panelProps: any) => {
    return panelProps.isActive ? <UpOutlined /> : <DownOutlined />;
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIcon={customExpandIcon}
      expandIconPosition="end"
      className="custom_collapse"
      items={panels}
      accordion
      ghost
      destroyInactivePanel
    />
  );
};

export default CustomCollapse;
