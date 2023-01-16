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
import { useState } from "react";
import { toast } from "react-toast";

const { Option } = Select;

const Email = ({ setDrawerOpen, setDrawerCLose, open }) => {
    const [form] = Form.useForm();
  const sendEmail = async (e) => {
    console.log(e);
    console.log(form.current);
    emailjs
      .send(
        "service_scr5zwc",
        "template_yurdsuj",
        {
          name: e.name,
          organization_name: e.organization_name,
          amount_required: e.amount_required,
          description: e.description,
          owner_address: e.owner_address,
        },
        "oypm55yhBCcBTuBRY"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Request send successfully",{deplay:4000});
          setDrawerCLose();
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Request Failed",{deplay:4000});
        }
      );
  };
  return (
    <>
      <Drawer
        title="Request for Orphange creation"
        width={720}
        onClose={setDrawerCLose}
        visible={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          ref={form}
          id="myForm"
          layout="vertical"
          onFinish={sendEmail}
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
              <Button onClick={setDrawerCLose}>Cancel</Button>
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

export default Email;
