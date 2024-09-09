import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';
import UploadDocs from './UploadDocuments';
import CustomCollapse from './CustomCollapse';

const { Option } = Select;
const { TextArea } = Input;

const CreateIssueModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [taskData, setTaskData] = useState<any>(null);
  const [uploadData, setUploadData] = useState<string[]>([]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const allFormData = {
          ...values,
          taskData,
          uploadData,
        };
        console.log('All Form Data:', allFormData);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields(); // Reset the form fields when canceling
  };

  const handleValuesChange = (changedValues: any) => {
    const requiredFields = [
      'issueTitle',
      'assignedTo',
      'priority',
      'dueDate',
      'category',
    ];
    const values = form.getFieldsValue();
    const hasErrors = requiredFields.some((field) => !values[field]);
    setIsButtonDisabled(hasErrors);
  };

  useEffect(() => {
    // Check initial form values for disabling the button
    handleValuesChange({});
  }, [form]);

  const handleCheckboxChange = (checkedValues: any[]) => {
    setSelectedOptions(checkedValues);
  };

  // Define collapses
  const collapses = [
    {
      key: 'task',
      label: 'Task',
      children: <TaskForm onTaskChange={setTaskData} initialData={taskData} />,
    },
    {
      key: 'attachment',
      label: 'Attachment',
      children: (
        <UploadDocs onUploadChange={setUploadData} initialData={uploadData} />
      ),
    },
  ];

  // Filter collapses based on selected checkboxes
  const visibleCollapses = collapses.filter((collapse) =>
    selectedOptions.includes(collapse.key)
  );

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        title="Create Issue"
        visible={visible}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined />}
        width="88%"
        footer={null}
      >
        <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Issue Title"
                name="issueTitle"
                rules={[
                  { required: true, message: 'Please input the issue title!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Assigned To"
                name="assignedTo"
                rules={[
                  { required: true, message: 'Please select an assignee!' },
                ]}
              >
                <Select placeholder="Select a person">
                  <Option value="john">John Doe</Option>
                  <Option value="jane">Jane Smith</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Impact" name="impact">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[
                  { required: true, message: 'Please select a priority!' },
                ]}
              >
                <Select placeholder="Select priority">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Due Date"
                name="dueDate"
                rules={[
                  { required: true, message: 'Please select a due date!' },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Revisited Date" name="revisitedDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Status" name="status">
                <Select placeholder="Select status">
                  <Option value="open">Open</Option>
                  <Option value="inProgress">In Progress</Option>
                  <Option value="closed">Closed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: 'Please select a category!' },
                ]}
              >
                <Select placeholder="Select category">
                  <Option value="bug">Bug</Option>
                  <Option value="feature">Feature</Option>
                  <Option value="improvement">Improvement</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Additional Options" name="additionalOptions">
                <Checkbox.Group onChange={handleCheckboxChange}>
                  <Checkbox value="task">Add Task</Checkbox>
                  <Checkbox value="attachment">Add Attachment</Checkbox>
                </Checkbox.Group>
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

          {visibleCollapses.length > 0 && (
            <CustomCollapse panels={visibleCollapses} />
          )}

          <Row justify="end" style={{ marginTop: '20px' }}>
            <Col>
              <Button
                type="primary"
                onClick={handleOk}
                disabled={isButtonDisabled}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateIssueModal;
