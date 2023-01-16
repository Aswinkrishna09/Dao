import { Loading, Orphanages } from "./reducers";
import { START_LOADING, STOP_LOADING } from "./reducers/constants/Error";
import { ORPHANGE_STATECHANGE } from "./reducers/constants/Orphanages";
import { REACT_APP_CONTRACT_ADDRESS } from "./config.js";
import emailjs from "@emailjs/browser";
import { toast } from "react-toast";
const { ethers } = require("ethers");
const OrphanFindZone = require("./ABI/OrphanFindZone.json");

export const getOrphanges = async (dispatch, toast) => {
  try {
    dispatch(Loading({ type: START_LOADING }));
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      let res = await OrphanContract.getOrphanges();

      console.log("tasks ", res);
      dispatch(
        Orphanages({
          type: ORPHANGE_STATECHANGE,
          value: res,
          key: "OrphanageList",
        })
      );
      dispatch(Loading({ type: STOP_LOADING }));
    } else {
      console.log("Ethereum object didn't find");
      dispatch(Loading({ type: STOP_LOADING }));
      toast.error("Ethereum account didn't find",{deplay:4000});
    }
  } catch (error) {
    // const code = error.data.replace('Reverted ','');
    // console.log('Reverted ',error.data.replace('Reverted ',''));
    console.log(error);
    dispatch(Loading({ type: STOP_LOADING }));
  }
};

export const AdminAuth = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      let res = await OrphanContract.AdminAuth();
      return res;
    } else {
      console.log("Ethereum object didn't find");
    }
  } catch (error) {
    console.log(error);
  }
};

export const CheckOrphanage = async (address) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      let res = await OrphanContract.withdrawOwner(address);
      // console.log(res.toNumber())
      return res;
    } else {
      console.log("Ethereum object didn't find");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createOrphanage = async (dispatch, toast, e, FormReset) => {
  try {
    dispatch(Loading({ type: START_LOADING }));
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      await OrphanContract.AddOrphanage(
        e.organization_name,
        e.amount_required,
        e.owner_address,
        e.description
      );

      toast.success("Orphanage Added",{deplay:4000});
      toast.warn("This may take some time to reflect in the portal. Please reload the page.",{deplay:4000});
      FormReset();
      dispatch(Loading({ type: STOP_LOADING }));
      emailjs
        .send(
          "service_scr5zwc",
          "template_wnxm076",
          {
            name: e.name,
            to_mail: e.to_mail,
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
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    } else {
      console.log("Ethereum object didn't find");
      dispatch(Loading({ type: STOP_LOADING }));
      toast.error("Ethereum account didn't find",{deplay:4000});
    }
  } catch (error) {
    console.log(error);
    dispatch(Loading({ type: STOP_LOADING }));
  }
};

export const createChild = async (dispatch, e, FormReset, id, GetChildren) => {
  try {
    dispatch(Loading({ type: START_LOADING }));
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      await OrphanContract.AddChild(
        e.name,
        e.age,
        e.childaddress,
        e.education,
        "imageurl",
        true,
        id
      );

      toast.success("Child Added",{deplay:4000});
      toast.warn("This may take some time to reflect in the portal. Please reload the page.",{deplay:4000});
      FormReset();
      GetChildren();
      dispatch(Loading({ type: STOP_LOADING }));
    } else {
      console.log("Ethereum object didn't find");
      dispatch(Loading({ type: STOP_LOADING }));
      toast.error("Ethereum account didn't find",{deplay:4000});
    }
  } catch (error) {
    console.log(error);
    dispatch(Loading({ type: STOP_LOADING }));
  }
};

export const getSingleOrphange = async (dispatch, id) => {
  try {
    dispatch(Loading({ type: START_LOADING }));
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      let res = await OrphanContract.Orphanages(id);

      console.log("tasks ", res);
      dispatch(
        Orphanages({
          type: ORPHANGE_STATECHANGE,
          value: res,
          key: "Orphanage",
        })
      );
      dispatch(Loading({ type: STOP_LOADING }));
      return res;
    } else {
      console.log("Ethereum object didn't find");
      dispatch(Loading({ type: STOP_LOADING }));
      toast.error("Ethereum account didn't find",{deplay:4000});
    }
  } catch (error) {
    // const code = error.data.replace('Reverted ','');
    // console.log('Reverted ',error.data.replace('Reverted ',''));
    console.log(error);
    dispatch(Loading({ type: STOP_LOADING }));
  }
};

export const getChildren = async (dispatch, id) => {
  try {
    dispatch(Loading({ type: START_LOADING }));
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      let res = await OrphanContract.getChilren(id);

      console.log("tasks ", res);
      dispatch(
        Orphanages({
          type: ORPHANGE_STATECHANGE,
          value: res,
          key: "Orphanage",
        })
      );
      dispatch(Loading({ type: STOP_LOADING }));
      return res;
    } else {
      console.log("Ethereum object didn't find");
      dispatch(Loading({ type: STOP_LOADING }));
      toast.error("Ethereum account didn't find",{deplay:4000});
    }
  } catch (error) {
    // const code = error.data.replace('Reverted ','');
    // console.log('Reverted ',error.data.replace('Reverted ',''));
    console.log(error);
    dispatch(Loading({ type: STOP_LOADING }));
  }
};

export const Donate = async ({
  setError,
  ether,
  Donated,
  setIsModalOpen,
  OrphanageId,
}) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      await OrphanContract.Donate(OrphanageId, {
        value: ethers.utils.parseEther(ether),
      });
      Donated();
      setIsModalOpen(false);
    } else {
      console.log("Ethereum object didn't find");
    }
  } catch (err) {
    setError(err.message);
  }
};

export const withdrawDetails = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      const data = await OrphanContract.withdrawDetails();
      return data;
    } else {
      console.log("Ethereum object didn't find");
    }
  } catch (err) {
    console.log("Error ", err.message);
  }
};

export const withdrawAmount = async (dispatch, Donated, setWithdrawModel) => {
  dispatch(Loading({ type: START_LOADING }));
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const OrphanContract = new ethers.Contract(
        REACT_APP_CONTRACT_ADDRESS,
        OrphanFindZone,
        signer
      );
      await OrphanContract.withdraw();
      setWithdrawModel(false);
      dispatch(Loading({ type: STOP_LOADING }));
      Donated();
      toast.success("Amount successfully send the children's account",{deplay:4000});
    } else {
      dispatch(Loading({ type: STOP_LOADING }));
      console.log("Ethereum object didn't find");
    }
  } catch (err) {
    console.log("Error ", err.message);
    dispatch(Loading({ type: STOP_LOADING }));
    toast.error("Transcation failed",{deplay:4000});
  }
};
