import React, { useEffect, useState } from "react";
// import Child from "../common/Child";
import {
  List,
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Alert,
} from "antd";
import { Donate, getChildren, getSingleOrphange } from "../../contractAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../reducers";
import { START_LOADING, STOP_LOADING } from "../../reducers/constants/Error";
import useWindowSize from "../common/UseWindowSize";
import Confetti from "react-confetti";
import Child from "../common/Child";
import Withdraw from "../common/Withdraw";
import image1 from "../../assets/images/modern-design.jpg";
import { ethers } from "ethers";
import { toast } from "react-toast";
const data1 = [
  {
    title: "Basic",
    content: [
      {
        price: "£29.99",
        space: "1 GB of space",
        user: "1 user",
        support: "24/7 support",
        backup: "Safe, reliable backup",
        access: "Access from anywhere",
      },
    ],
  },
];

function AppDashboard() {
  let { id } = useParams();
  const [orphange, setOrphange] = useState({});
  const [error, setError] = useState("");
  const [children, setChildren] = useState([]);
  const [withdrawModel, setWithdrawModel] = useState(false);
  const { width, height } = useWindowSize();
  const [isDonated, setIsDonated] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setDrawerOpen = () => {
    setOpen(true);
  };
  const setDrawerCLose = () => {
    setOpen(false);
  };
  const Donated = () => {
    setIsDonated(true);
    setTimeout(() => {
      setIsDonated(false);
      window.location.reload()
    }, 5000);
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  const GetChildren = async () => {
    dispatch(Loading({ type: START_LOADING }));
    const Children = await getChildren(dispatch, id);
    setChildren(Children);
    dispatch(Loading({ type: STOP_LOADING }));
  };
  const getOrphange = async () => {
    const obj = await getSingleOrphange(dispatch, id);
    const num = obj.amountReceived.toNumber();
    const num2 = obj.amountRequired.toNumber();
    setOrphange({ ...obj, amountReceived: ethers.utils.formatEther(num),amountRequired:ethers.utils.formatEther(num2) });
    GetChildren();
  };
  useEffect(() => {
    getOrphange();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
  ];

  const handleSubmit = async (data) => {
    console.log(data);
    setError("");
    await Donate({
      setError,
      ether: String(data.amount),
      Donated,
      setIsModalOpen,
      OrphanageId: id,
    });
  };

  return (
    <div id="pricing" className="block pricingBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>{orphange.organizationName}</h2>
          <p>{orphange.description}</p>
          {state.isOrphanage ? (
            <Space>
              <Button type="primary" onClick={() => setOpen(true)} size="large">
                <i className="fab fa-telegram-plane"></i> Add Child
              </Button>
              <Button onClick={()=>{
                if(children.length==0){
                  return toast.error("No child found",{deplay:4000})
                }
                if(orphange.amountReceived==0){
                  return toast.error("No Fund found",{deplay:4000})
                }
                setWithdrawModel(true)
              }} type="primary" size="large">
                <i className="fab fa-telegram-plane"></i> Withdraw Amount
              </Button>
            </Space>
          ) : (
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              size="large"
            >
              <i className="fab fa-telegram-plane"></i> Donate
            </Button>
          )}
        </div>
        <Child
          setDrawerOpen={setDrawerOpen}
          setDrawerCLose={setDrawerCLose}
          open={open}
          GetChildren={GetChildren}
        />
        <Modal
          footer={false}
          title="Donate"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          {error && <Alert showIcon message={error} type="error" />}
          <Form
            // form={form}
            id="myForm"
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the amount in ether!",
                    },
                  ]}
                >
                  <InputNumber
                    name="amount"
                    style={{ width: "100%" }}
                    placeholder="Please enter the amount in ether"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} justify="end">
              {/* <Button onClick={FormReset}>Reset</Button> */}
              <Button htmlType="submit" block type="primary">
                PAY NOW
              </Button>
            </Row>
          </Form>
        </Modal>
        {withdrawModel&&<Withdraw Donated={Donated} amountReceived={orphange.amountReceived} amountRequired={orphange.amountRequired} withdrawModel={withdrawModel} setWithdrawModel={setWithdrawModel} error={error} />}
        <Row gutter={16}>
          <Col sm={24} md={8}>
            <List
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className="orphange-details"
                    hoverable
                    cover={<img alt="Modern Design" src={image1} />}
                    title={orphange.organizationName}
                  >
                    <p className="large">
                      Received {orphange.amountReceived} ETH{" "}
                    </p>
                    <p>Amount Required :{orphange.amountRequired} ETH</p>
                    <p>No of Childrens :{children.length}</p>
                    {state.isOrphanage ? (
                      <Space>
                        <Button onClick={()=>{
                if(children.length==0){
                  return toast.error("No child found",{deplay:4000})
                }
                if(orphange.amountReceived==0){
                  return toast.error("No Fund found",{deplay:4000})
                }
                setWithdrawModel(true)
              }} type="primary" size="middle">
                          <i className="fab fa-telegram-plane"></i> Withdraw
                          Amount
                        </Button>
                        {/*                         
                        <input
                          style={{ display: "none" }}
                          id="upload"
                          onChange={(e) => {
                            const files = e.target.files[0];
                            setFile(files);
                          }}
                          type="file"
                        /> */}
                        {/* <Button type="primary" size="middle">
                          <i className="fab fa-trello"></i> Update Image
                        </Button> */}
                      </Space>
                    ) : (
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        type="primary"
                        size="large"
                      >
                        <i className="fab fa-telegram-plane"></i> Donate
                      </Button>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          <Col sm={24} md={16}>
            <h2>Childrens List</h2>
            <Table
              loading={state.loading}
              columns={columns}
              dataSource={children}
            />
          </Col>
        </Row>
        {isDonated && <Confetti width={width} height={height} />}
      </div>
    </div>
  );
}

export default AppDashboard;
