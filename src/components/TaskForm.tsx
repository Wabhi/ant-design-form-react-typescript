import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface TaskFormProps {
  onTaskChange: (taskData: any) => void;
  initialData?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskChange, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleFormChange = () => {
    onTaskChange(form.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={handleFormChange}
      initialValues={initialData}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Task Title"
            name="taskTitle"
            rules={[
              { required: true, message: 'Please input the task title!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            label="Assigned To"
            name="assignedTo"
            rules={[{ required: true, message: 'Please select an assignee!' }]}
          >
            <Select placeholder="Select a person">
              <Option value="john">John Doe</Option>
              <Option value="jane">Jane Smith</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status">
              <Option value="open">Open</Option>
              <Option value="inProgress">In Progress</Option>
              <Option value="closed">Closed</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
