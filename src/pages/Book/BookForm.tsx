import { Button, DatePicker, Form, Input, Select } from "antd";
import CustomImage from "../../components/CustomImage";
import axios from "axios";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

type Props = {
    formType: any;
    setFormType: any;
}

const BookForm = (props: Props) => {
  const {formType, setFormType} = props;
  const [formData, setFormData] = useState({
    name: '',
    publishedDate: '',
    genres: [],
    author: '',
  })

  const handleSubmit = () => {
    if(formType.type === 'created') {
      console.log(1)
    } else {
      console.log(2)
    }
  }

  const handleChange = (e:any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
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
            // initialValue={updateData?.name}
          >
            <Input
              id="name"
              allowClear
              placeholder="Nhập tên sách"
              onChange={handleChange}
            ></Input>
          </Form.Item>
          <Form.Item
            name="description"
            label="Ngày xuất bản"
            rules={[{ required: true }]}
            // initialValue={updateData?.description}
          >
            <DatePicker 
            placeholder="Ngày xuất bản"
            className="w-full"
            onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            name="note"
            label="Thể loại"
            rules={[{ required: true }]}
            // initialValue={updateData?.note}
          >
            <Input
              id="note"
              allowClear
              placeholder="Nhập thể loại"
              onChange={handleChange}
            ></Input>
          </Form.Item>
          <Form.Item
            name="status"
            label="Tác giả"
            // initialValue={updateData?.status}
          >
            <Select
              id="status"
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
            </Select>
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