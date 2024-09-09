import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Button, message, List, Row, Col, Popconfirm } from 'antd';
import {
  InboxOutlined,
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

interface UploadDocsProps {
  onUploadChange: (fileList: string[]) => void;
  initialData?: string[];
}

const UploadDocs: React.FC<UploadDocsProps> = ({
  onUploadChange,
  initialData = [],
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(initialData);

  useEffect(() => {
    setUploadedFiles(initialData);
  }, [initialData]);

  const handleUploadChange = useCallback(
    (info: any) => {
      const newFiles = info.fileList.map((file: any) => file.name);
      setUploadedFiles(newFiles);
      onUploadChange(newFiles);
    },
    [onUploadChange]
  );

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('https://your-upload-url.com/upload', {
        method: 'POST',
        body: formData,
      });

      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
    return false; // Prevent automatic upload
  };

  const draggerProps: UploadProps = {
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        await handleUpload(file as RcFile);
        onSuccess?.(file);
      } catch (error) {
        onError?.(error as Error);
      }
    },
    showUploadList: false,
    multiple: true,
  };

  const handleButtonClick = () => {
    document.getElementById('manual-upload')?.click();
  };

  const handleDelete = (fileName: string) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileName);
      onUploadChange(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <Row gutter={16} style={{ flex: 1 }}>
        <Col
          span={8}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '250px',
            width: '350px',
          }}
        >
          <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
            <List
              bordered
              dataSource={uploadedFiles}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure you want to delete this file?"
                      onConfirm={() => handleDelete(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#!" className="ant-list-item-action">
                        <DeleteOutlined style={{ color: 'red' }} />
                      </a>
                    </Popconfirm>,
                  ]}
                >
                  {item}
                </List.Item>
              )}
              style={{ height: '100%', overflow: 'auto' }}
            />
          </div>
        </Col>
        <Col
          span={8}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            width: '450px',
          }}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <Dragger
              {...draggerProps}
              onChange={handleUploadChange}
              style={{
                height: '100%',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </Col>
        <Col
          span={8}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            width: '450px',
          }}
        >
          <Button
            icon={<UploadOutlined />}
            onClick={handleButtonClick}
            style={{ marginBottom: '20px' }}
          >
            Upload Files
          </Button>
          <Upload
            id="manual-upload"
            {...draggerProps}
            onChange={handleUploadChange}
            style={{ display: 'none' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UploadDocs;
