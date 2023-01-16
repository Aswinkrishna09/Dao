import React, { useEffect, useState } from "react";

import { Anchor, Drawer, Button, Tooltip, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { AdminAuth, CheckOrphanage } from "../../contractAPI";
import { Orphanages } from "../../reducers";
import { ORPHANGE_STATECHANGE } from "../../reducers/constants/Orphanages";
import { toast } from "react-toast";
import Email from "./Email";
const { Link } = Anchor;

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

function AppHeader() {
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOrphanage, setIsOrphanage] = useState(false);
  const [orphanageId, setOrphangeId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const setDrawerOpen = () => {
    setOpen(true);
  };
  const setDrawerCLose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  window.ethereum.on("accountsChanged", function(accounts) {
    console.log("accountsChanged", accounts);
    //toast.success("Orphanage Added");
    checkAdmin();
    isOrphanageExistCheck(accounts[0]);
  });
  const isOrphanageExistCheck = async (Address) => {
    const check = await CheckOrphanage(Address);
    if (check) {
      const num = check.toNumber();
      console.log(num);
      if (num !== 0) {
        setIsOrphanage(true);
        dispatch(
          Orphanages({
            type: ORPHANGE_STATECHANGE,
            value: true,
            key: "isOrphanage",
          })
        );
        dispatch(
          Orphanages({
            type: ORPHANGE_STATECHANGE,
            value: num,
            key: "OrphanageID",
          })
        );
        setOrphangeId(num);
      } else {
        setIsOrphanage(false);
        dispatch(
          Orphanages({
            type: ORPHANGE_STATECHANGE,
            value: false,
            key: "isOrphanage",
          })
        );
        dispatch(
          Orphanages({
            type: ORPHANGE_STATECHANGE,
            value: 0,
            key: "OrphanageID",
          })
        );
      }
    }
  };
  const connectWallet = async () => {
    if (account == "") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(
        "window.ethereum.networkVersion ",
        window.ethereum.networkVersion
      );
      if (window.ethereum.networkVersion !== "80001") {
        console.log("network error");
        //setOpen(true);
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["polygon"],
            },
          ],
        });
        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAccount(Address);
        isOrphanageExistCheck(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance.substring(0, 5) + " MATIC");
      }
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAccount(Address);
      isOrphanageExistCheck(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance.substring(0, 5) + " MATIC");
    }
  };

  const checkAdmin = async () => {
    const status = await AdminAuth();
    setIsAdmin(status);
  };
  const checkOrphanage = async () => {
    await isOrphanageExistCheck(account);
  };
  useEffect(() => {
    connectWallet().then(() => {
      checkAdmin();
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="">FUND ZONE</a>
        </div>
        <Email
          setDrawerOpen={setDrawerOpen}
          setDrawerCLose={setDrawerCLose}
          open={open}
        />

        <div className="mobileHidden">
          <Anchor targetOffset="65">
            {/* <Link href="/" title="Home" /> */}
            <Tooltip title={"Home"} color={"#108ee9"}>
              <Button type="text" onClick={() => navigate("/")}>
                <Badge color="white" />
                Home
              </Button>
            </Tooltip>
            {/* <Link href="/about" title="About" /> */}
            <Tooltip title={"About"} color={"#108ee9"}>
              <Button type="text" onClick={() => navigate("/about")}>
                <Badge color="white" />
                About
              </Button>
            </Tooltip>
            {/* <Link href="/add-orphange" title="Add Orphange" /> */}
            <Tooltip
              title={
                isAdmin
                  ? "Create Orphange"
                  : isOrphanage
                  ? "Manage your orphange"
                  : "Give request for orphange creation"
              }
              color={"#108ee9"}
            >
              <Button
                type="text"
                onClick={() => {
                  if (isAdmin) {
                    navigate("/add-orphange");
                  } else if (isOrphanage) {
                   // navigate("/add-orphange");
                    navigate("/orphange/" + orphanageId);
                  } else {
                    setOpen(true);
                    console.log("openin......");
                  }
                }}
              >
                <Badge color="white" />
                {isAdmin
                  ? "Add Orphange"
                  : isOrphanage
                  ? "Dashboard"
                  : "Request Orphange creation"}
              </Button>
            </Tooltip>
            {"   "}
            <Tooltip title={account} color={"#108ee9"} key={"#108ee9"}>
              <Button
                style={{
                  background: account ? "green" : "red",
                  borderColor: "yellow",
                  color: "white",
                }}
                // onClick={() => message}
              >
                <Badge color="white" />
                {account ? "Connected" : "Connect Wallet"}
              </Button>
            </Tooltip>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Tooltip title={account} color={"#108ee9"} key={"#108ee9"}>
            <Button
              style={{
                background: account ? "green" : "red",
                borderColor: "yellow",
                color: "white",
              }}
              // onClick={connectWallet}
            >
              <Badge color="white" />
              {account ? "Connected" : "Connect Wallet"}
            </Button>
          </Tooltip>
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />
              <Link href="/about" title="About" />
              <Link href={isAdmin
                  ? "/add-orphange"
                  : isOrphanage
                  ? "/orphange/" + orphanageId
                  : "/"
                }
                   title={isAdmin
                  ? "Add Orphange"
                  : isOrphanage
                  ? "Dashboard"
                  : "Request Orphange creation"} />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
