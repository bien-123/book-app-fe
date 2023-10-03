import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { listHits } from '../../api/axios';
import BookForm from './BookForm';
import { type } from 'os';

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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={handleUpdateForm}>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const [data, setData] = useState<DataType[]>([]);
  const [formType, setFormType] = useState({
    open: false,
    type: FORM_TYPE.CREATED,
  });

  useEffect(() => {
        const formattedData = listHits.map((item: any, index: any) => ({
            key: index.toString(),
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
  }

  const handleUpdateForm = () => {
    setFormType({open: true, type: FORM_TYPE.UPDATED});
  }

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
          <BookForm formType={formType} setFormType={setFormType}></BookForm>
        )}
     </>
    )
}

export default Book;