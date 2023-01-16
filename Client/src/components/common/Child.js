import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createChild } from "../../contractAPI";

const { Option } = Select;

const Child = ({ setDrawerOpen, setDrawerCLose, open ,GetChildren}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const state = useSelector((state) => state.Reducer);
  const submit = (e) => {
    console.log(e)
    console.log(state.OrphanageID)
    createChild(dispatch, e, FormReset, state.OrphanageID,GetChildren);
  };
  const FormReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Drawer
        title="Add Child"
        width={720}
        onClose={setDrawerCLose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          form={form}
          id="myForm"
          layout="vertical"
          onFinish={submit}
          requiredMark
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Child name",
                  },
                ]}
              >
                <Input name="name" placeholder="Please enter child name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="childaddress"
                label="Child Account address"
                rules={[
                  {
                    required: true,
                    message: "Please enter Child Account address!",
                  },
                ]}
              >
                <Input
                  name="childaddress"
                  placeholder="Please enter Child Account address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="age"
                label="Child Age"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please enter the age of child!",
                  },
                ]}
              >
                <InputNumber
                  name="age"
                  style={{ width: "100%" }}
                  placeholder="Please enter the age of child"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="education"
                label="Education"
                rules={[
                  {
                    required: true,
                    message: "Please select Education!",
                  },
                ]}
              >
                <Select name="education" placeholder="Please select Education">
                  <Option value="Lower Primary">Lower Primary</Option>
                  <Option value="Upper Primary">Upper Primary</Option>
                  <Option value="High School">High School</Option>
                  <Option value="Higher Secondary">Higher Secondary</Option>
                  <Option value="Degree">Degree</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Space>
              <Button onClick={FormReset}>Reset</Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Child;
