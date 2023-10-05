import { Button, DatePicker, Form, Input, Select } from "antd";
import CustomImage from "../../components/CustomImage";
import axios from "axios";
import { useState } from "react";
// import { Value } from "sass";

// const { TextArea } = Input;
const { Option } = Select;

type Props = {
    formType: any;
    setFormType: any;
    updateData: any;
}

const BookForm = (props: Props) => {
  const {formType, setFormType, updateData} = props;
  const [formData, setFormData] = useState({
    name: '',
    publishedDate: '',
    genres: [],
    author: '',
  })

  const handleSubmit = async () => {
    if((formType.type === 'created') && (updateData === null)) {
      try {
        let data:any = {
          name: document.getElementById('name'),
          publishedDate: document.getElementById('publishedDate'),
          genres: document.getElementById('genres'),
          author: document.getElementById('author'),
        }
        data = {
          name: data.name.value,
          publishedDate: data.publishedDate.value,
          genres: [data.genres.value],
          author: data.author.value,
        }
        const response = await axios.post('http://localhost:4000/v1/book/add', data);
        setFormData(response.data);
        setFormType({...formType, open: false});
      } catch (err) {
        console.log('Error:', err);
      }
    } else if(formType.type === 'updated') {
      try {
        let data:any = {
          name: document.getElementById('name'),
          publishedDate: document.getElementById('publishedDate'),
          genres: document.getElementById('genres'),
          author: document.getElementById('author'),
        }
        data = {
          name: data.name.value,
          publishedDate: data.publishedDate.value,
          genres: [data.genres.value],
          author: data.author.value,
        }
        const response = await axios.put(`http://localhost:4000/v1/book/${updateData.key}`, data);
        setFormData(response.data);
        setFormType({...formType, open: false});
      } catch (err) {
        console.log('Error:', err);
      }
    }
  }

    const handleClose = () => {
        setFormType({...formType, open: false});
    }

    return (
    <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
      <Form name="wrap" labelCol={{ flex: "300px" }} labelAlign="left">
        <div className="grid px-4 pt-15">
          <Form.Item
            name="namebreak"
            label="Tên sách"
            rules={[{ required: true, message: "Bạn phải nhập tên vi phạm" }]}
            initialValue={updateData?.name}
          >
            <Input
              id="name"
              allowClear
              placeholder="Nhập tên sách"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            ></Input>
          </Form.Item>
          <Form.Item
            name="description"
            label="Ngày xuất bản"
            rules={[{ required: true }]}
            // initialValue={updateData?.publishedDate}
          >
            <DatePicker 
            id="publishedDate"
            placeholder="Ngày xuất bản"
            className="w-full"
            // onChange={(e) => setFormData({...formData})}
            />
          </Form.Item>
          <Form.Item
            name="genres"
            label="Thể loại"
            rules={[{ required: true }]}
            initialValue={updateData?.genres}
          >
            <Input
              id="genres"
              allowClear
              placeholder="Nhập thể loại"
            ></Input>
          </Form.Item>
          <Form.Item
            name="status"
            label="Tác giả"
            initialValue={updateData?.author}
          >
            {/* <Select
              id="author"
              placeholder="Tác giả"
              allowClear
              style={{ marginBottom: 20 }}
              onChange={handleChange}
            >
              <Option id="id1" value="Đang hoạt động">
                Đang hoạt động
              </Option>
              <Option id="id2" value="Dừng hoạt động">
                Dừng hoạt động
              </Option>
            </Select> */}
            <Input
              id="author"
              allowClear
              placeholder="Tên tác giả"
            ></Input>
          </Form.Item>
        </div>
      </Form>
      <div className="flex justify-end px-4 pb-2 gap-5">
        <Button
          key="back"
          onClick={handleClose}
          className="flex btn-delete items-center gap-3"
        >
          {/* <CustomImage  className="w-7 h-7" /> */}
          <p>Hủy</p>
        </Button>

        <Button className="flex btn-save" onClick={handleSubmit}>
          {/* <CustomImage  className="w-7 h-7" /> */}
          <p>Lưu</p>
        </Button>
      </div>
    </div>
    )
}

export default BookForm;