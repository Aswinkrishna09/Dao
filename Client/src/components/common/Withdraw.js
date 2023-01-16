import {
  Alert,
  Button,
  Col,
  Descriptions,
  Form,
  InputNumber,
  Modal,
  Row,
  Spin,
  Tooltip,
} from "antd";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawAmount, withdrawDetails } from "../../contractAPI";
const Withdraw = ({
  withdrawModel,
  setWithdrawModel,
  error,
  amountRequired,
  amountReceived,
  Donated,
}) => {
  const [form] = Form.useForm();
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  const callContract = async () => {
    const data = await withdrawDetails();
    console.log("withdrawDetails ", data);
    if (data) {
      let u1 = data[0].toNumber();
      let u2 = ethers.utils.formatEther(data[1].toNumber());
      let u3 = ethers.utils.formatEther(data[2].toNumber());
      console.log("withdrawDetails ", u1);
      setDetails({ no: u1, amount: u2, fee: u3 });
      console.log("withdrawDetails ", u2);
      console.log("withdrawDetails ", u3);
    }
  };
  useEffect(() => {
    console.log(amountRequired >= amountReceived)
    callContract();
  }, []);

  const WithdrawAmount = async () => {
    await withdrawAmount(dispatch, Donated, setWithdrawModel);
  };

  return (
    <Modal
      width={750}
      footer={false}
      title=""
      open={withdrawModel}
      onCancel={() => setWithdrawModel(false)}
    >
      {error && <Alert showIcon message={error} type="error" />}
      <Row justify={"end"} gutter={[16, 16]}>
        <Col span={24}>
          <Descriptions title="Withdraw Details" layout="vertical" bordered>
            <Descriptions.Item label="No.of Children">
              {details.no}
            </Descriptions.Item>
            <Descriptions.Item label="Amount for each child">
              {details.amount} ETH
            </Descriptions.Item>
            <Descriptions.Item label="Fund Zone Fee">
              {details.fee} ETH
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Tooltip
            title={
              "You can withdraw amount even if the required amount not meets by using force withdraw"
            }
          >
            <Button
              loading={state.loading}
              onClick={WithdrawAmount}
              disabled={amountRequired < amountReceived?false:true}
              htmlType="submit"
              block
              danger
            >
              Force Withdraw
            </Button>
          </Tooltip>
        </Col>
        <Col span={12}>
          <Tooltip title={"Withdraw amount"}>
            <Button
              loading={state.loading}
              disabled={amountRequired >= amountReceived?false:true}
              block
              onClick={WithdrawAmount}
              type="primary"
            >
              Withdraw
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Modal>
  );
};

export default Withdraw;
