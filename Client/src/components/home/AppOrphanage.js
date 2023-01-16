import React from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  Row,
  Col,
  InputNumber,
} from "antd";
import { createOrphanage } from "../../contractAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toast";
import { ethers } from "ethers";
const { TextArea } = Input;

function AppOrphanage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  const [form] = Form.useForm();
  const FormReset = () => {
    form.resetFields();
  };
  const CreateOrphanage = (e) => {
    console.log(e);
    let obj = {
      ...e,
      amount_required: ethers.utils.parseEther(String(e.amount_required)).toNumber(),
    };
    console.log("details ",obj)
    createOrphanage(dispatch, toast, obj,FormReset);
  };
  return (
    <div id="contact" className="block contactBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Create Orphanage</h2>
        </div>
        <Form
          form={form}
          id="myForm"
          layout="vertical"
          onFinish={CreateOrphanage}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="organization_name"
                label="Organization Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the organization name!",
                  },
                ]}
              >
                <Input
                  name="organization_name"
                  placeholder="Please enter the organization name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="owner_address"
                label="Owner address"
                rules={[
                  {
                    required: true,
                    message: "Please enter owner address!",
                  },
                ]}
              >
                <Input
                  name="owner_address"
                  placeholder="Please enter owner address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input name="name" placeholder="Please enter your name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amount_required"
                label="Amount Required"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please enter the amount required in Ether!",
                  },
                ]}
              >
                <InputNumber
                  name="amount_required"
                  style={{ width: "100%" }}
                  placeholder="Please enter the amount required in Ether"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="to_mail"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input name="to_mail" placeholder="Please enter your email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter some description about your organization!",
                  },
                ]}
              >
                <Input.TextArea
                  name="description"
                  rows={4}
                  placeholder="Please enter some description about your organization"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Space>
              <Button onClick={FormReset} type="primary">
                Reset
              </Button>
              <Button loading={state.loading} htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default AppOrphanage;
