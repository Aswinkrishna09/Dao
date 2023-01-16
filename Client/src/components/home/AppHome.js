import React, { useEffect } from "react";
import image1 from "../../assets/images/modern-design.jpg";

import { Row, Col, Spin, Button } from "antd";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrphanges } from "../../contractAPI";
import { toast } from "react-toast";
const { Meta } = Card;

function AppHome() {
  const state = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getOrphanges(dispatch, toast);
  }, []);
  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>List of Orphanges</h2>
          <p>
            You can donate your desired amount and the fund will be tranfered to
            children's wallet on each Orphanges you funds {state.error}
          </p>
        </div>
        {state.loading ? (
          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <center>
                <Spin tip="Loading" size="large"></Spin>
              </center>
            </Col>
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            {state.OrphanageList.map((data) => (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                <Card
                  hoverable
                  onClick={() => {
                    navigate("/orphange/" + data.id.toNumber());
                  }}
                  cover={<img alt="Modern Design" src={image1} />}
                >
                  
                  <Meta title={data.organizationName} description={<Button onClick={() => {
                    navigate("/orphange/" + data.id.toNumber());
                  }} type="primary" size="large">
                    <i className="fab fa-telegram-plane"></i> Contribute
                  </Button>}/>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default AppHome;
