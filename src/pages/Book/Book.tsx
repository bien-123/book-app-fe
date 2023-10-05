import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { listHits } from '../../api/axios';
import BookForm from './BookForm';
import axios from 'axios';

interface DataType {
    key: string;
    name: string;
    publishedDate: string;
    genres: string[];
    author: string;
    action: string[];
  }

  const FORM_TYPE = {
    CREATED: "created",
    UPDATED: "updated",
  };

const Book = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên sách',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      align: "center",
    },
    {
      title: 'Thể loại',
      key: 'genres',
      dataIndex: 'genres',
      align: "center",
      render: (_, { genres }) => (
        <>
          {genres.map((genre) => {
            let color = genre.length > 5 ? 'geekblue' : 'green';
            if (genre === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={genre}>
                {genre.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
        align: "center",
      },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_, record: any) => (
        <Space size="middle">
          <a onClick={() => handleUpdateForm(record.key)}>Update</a>
          <a onClick={() => showModal(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];
  
  const [data, setData] = useState<DataType[]>([]);
  const [formType, setFormType] = useState({
    open: false,
    type: FORM_TYPE.CREATED,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [updateData, setUpdateData] = useState<DataType | null>(null);
  const [idData, setIdData] = useState();


  useEffect(() => {
        const formattedData = listHits.map((item: any, index: any) => ({
            // key: index.toString(),
            key: item._id,
            name: item.name,
            publishedDate: item.publishedDate,
            genres: item.genres,
            author: item.author,
            action: [],
        }));
        setData(formattedData);
  }, []);

  const handleAddNewForm = () => {
    setFormType({open: true, type: FORM_TYPE.CREATED});
    setUpdateData(null);
  }

  const handleUpdateForm = (id: any) => {
    const selectedData = data.find((c) => c.key === id);
    if (selectedData) {
      setUpdateData(selectedData);
    }
    setFormType({open: true, type: FORM_TYPE.UPDATED});
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteData = () => {
    const url = `http://localhost:4000/v1/book/${idData}`;
    axios.delete(url)
      .then(response => {
        const updatedData = data.filter(item => item.key !== idData);
        setData(updatedData)
        setIsModalOpen(false);

        api.success({
          message: 'Data deleted successfully',
        });
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const showModal = (item: any) => {
    setIdData(item);
    setIsModalOpen(true);
  };

    return (
        <>
        {!formType.open ? (
          <>
            <Space wrap size='large'>
              <Button type="primary" onClick={handleAddNewForm}>Thêm mới</Button>
              <Button >Refresh</Button>
            </Space>
            <div className="mt-3">
                <Table columns={columns} dataSource={data} />
            </div>
          </>
        ) : (
          <BookForm formType={formType} setFormType={setFormType} updateData={updateData}></BookForm>
        )}
        <Modal
        title="Xóa vi phạm"
        open={isModalOpen}
        // onOk={handleDeleteData}
        onCancel={handleCancel}
        centered
        footer={
          <div className="flex justify-center mt-16">
            <Button
              key="back"
              onClick={handleCancel}
              className="flex btn-delete items-center gap-3"
            >
              <p>Hủy</p>
            </Button>
            <Button
              key="submit"
              onClick={handleDeleteData}
              className="flex btn-access items-center"
              type="primary"
              size="large"
              danger
            >
              <p>Xác nhận</p>
              {contextHolder}
            </Button>
          </div>
        }
      >
        <p>
          Bạn chắc chắn muốn xóa vi phạm đã chọn? Các dữ liệu liên quan đến vi
          phạm sẽ xóa hỏi hệ thống
        </p>
      </Modal>
     </>
    )
}

export default Book;