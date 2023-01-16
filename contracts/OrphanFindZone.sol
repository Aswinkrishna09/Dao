// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract OrphanFindZone {
    address public owner;
    struct Orphanage {
        bool isDonationsAccepting;
        address withdrawOwner;
        bool orphanageCreated;
        string organizationName;
        string description;
        Child[] children;
        uint256 amountRequired;
        uint256 amountReceived;
        uint256 totalAmountReceived;
        uint256 noOfPeopleDonated;
    }

    struct OrphanageSendFormat {
        uint256 id;
        bool isDonationsAccepting;
        address withdrawOwner;
        bool orphanageCreated;
        string organizationName;
        string description;
        uint256 amountRequired;
        uint256 amountReceived;
        uint256 totalAmountReceived;
        uint256 noOfPeopleDonated;
    }

    struct Child {
        address payable childaddress;
        string name;
        bool childEnabled;
        string education;
        uint8 age;
        string imageUrl;
    }

    mapping(uint256 => Orphanage) public Orphanages;
    uint256 public OrphanagesCount;
    mapping(address => uint256) public withdrawOwner;
    mapping(address => uint256) public Doners;
    uint256 public noOfDoners;

    event OrphanageAdded(
        address withdrawOwner,
        string organizationName,
        uint256 amountRequired
    );
    event OrphanageUpdated(
        bool isDonationsAccepting,
        string organizationName,
        address[] children,
        uint256 amountRequired
    );

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only owner can modify");
        _;
    }

    modifier OnlyWithdrawOwner() {
        require(
            withdrawOwner[msg.sender] != 0,
            "Only withdraw owner can modify"
        );
        _;
    }

    function AddOrphanage(
        string memory _organizationName,
        uint256 _amountRequired,
        address _withdrawOwner,
        string memory _description
    ) external OnlyOwner {
        OrphanagesCount++;
        Orphanage storage newOrphanage = Orphanages[OrphanagesCount];
        newOrphanage.organizationName = _organizationName;
        newOrphanage.description = _description;
        newOrphanage.orphanageCreated = true;
        newOrphanage.amountRequired = _amountRequired;
        newOrphanage.isDonationsAccepting = false;
        newOrphanage.withdrawOwner = payable(_withdrawOwner);
        withdrawOwner[_withdrawOwner] = OrphanagesCount;
        emit OrphanageAdded(_withdrawOwner, _organizationName, _amountRequired);
    }

    function AddChild(
        string memory _name,
        uint8 _age,
        address payable _childaddress,
        string memory _education,
        string memory _imageUrl,
        bool _childEnabled,
        uint256 OrphanageId
    ) external OnlyWithdrawOwner {
        require(
            Orphanages[OrphanageId].orphanageCreated,
            "Orphanage Not exist"
        );

        Orphanage storage orphanage = Orphanages[OrphanageId];
        bool childExist;
        for (uint256 i = 0; i < orphanage.children.length; i++) {
            if (orphanage.children[i].childaddress == _childaddress) {
                childExist = true;
            }
        }
        require(childExist == false, "Child address already exist");
        Child memory newChild = Child(
            _childaddress,
            _name,
            _childEnabled,
            _education,
            _age,
            _imageUrl
        );
        orphanage.children.push(newChild);
    }

    function DisableChild(uint256 OrphanageId, address _childaddress)
        external
        OnlyWithdrawOwner
    {
        require(
            Orphanages[OrphanageId].orphanageCreated,
            "Orphanage Not exist"
        );
        Orphanage storage orphanage = Orphanages[OrphanageId];
        for (uint256 i = 0; i < orphanage.children.length; i++) {
            if (orphanage.children[i].childaddress == _childaddress) {
                orphanage.children[i].childEnabled = false;
            }
        }
    }

    function Donate(uint256 OrphanageId) external payable {
        Orphanage storage orphanage = Orphanages[OrphanageId];
        require(
            orphanage.amountReceived <= orphanage.amountRequired,
            "Required amount already met"
        );
        if (Doners[msg.sender] == 0) {
            noOfDoners++;
            orphanage.noOfPeopleDonated++;
        }
        Doners[msg.sender] += msg.value;
        orphanage.amountReceived += msg.value;
        orphanage.totalAmountReceived += msg.value;
    }

    function getChilren(uint256 OrphanageId)
        external
        view
        returns (Child[] memory)
    {
        return Orphanages[OrphanageId].children;
    }

    function withdrawDetails()
        external
        view
        OnlyWithdrawOwner
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        require(
            withdrawOwner[msg.sender] != 0,
            "Not Authorized to get details"
        );
        Orphanage storage orphanage = Orphanages[withdrawOwner[msg.sender]];
        uint256 childrenLength;
        for (uint256 i = 0; i < orphanage.children.length; i++) {
            if (orphanage.children[i].childEnabled) {
                childrenLength++;
            }
        }
        uint256 amountPortion = orphanage.amountReceived / childrenLength;
        uint256 contractFee = orphanage.amountReceived -
            (childrenLength * amountPortion);
        return (childrenLength, amountPortion, contractFee);
    }

    function withdraw() external OnlyWithdrawOwner {
        require(withdrawOwner[msg.sender] != 0, "Not Authorized to withdraw");
        Orphanage storage orphanage = Orphanages[withdrawOwner[msg.sender]];
        require(
            orphanage.amountReceived >= orphanage.amountRequired,
            "Required not amount not met"
        );
        require(
            address(this).balance >= orphanage.amountReceived,
            "Contract not having amount"
        );
        uint256 childrenLength;
        for (uint256 i = 0; i < orphanage.children.length; i++) {
            if (orphanage.children[i].childEnabled) {
                childrenLength++;
            }
        }
        uint256 amountPortion = orphanage.amountReceived / childrenLength;
        for (uint256 i = 0; i < childrenLength; i++) {
            payable(orphanage.children[i].childaddress).transfer(amountPortion);
        }
        orphanage.isDonationsAccepting = false;
        orphanage.amountRequired = 0;
        orphanage.amountReceived = 0;
    }

    function getContractBalance() external view OnlyOwner returns (uint256) {
        return address(this).balance;
    }

    function AdminAuth() external view returns (bool) {
        return msg.sender == owner;
    }

    function getOrphanges() public view returns (OrphanageSendFormat[] memory) {
        OrphanageSendFormat[] memory OrphanageArray = new OrphanageSendFormat[](
            OrphanagesCount
        );
        for (uint256 i = 1; i <= OrphanagesCount; i++) {
            OrphanageArray[i - 1] = OrphanageSendFormat({
                id:i,
                isDonationsAccepting: Orphanages[i].isDonationsAccepting,
                withdrawOwner: Orphanages[i].withdrawOwner,
                orphanageCreated: Orphanages[i].orphanageCreated,
                organizationName: Orphanages[i].organizationName,
                description: Orphanages[i].description,
                amountRequired: Orphanages[i].amountRequired,
                amountReceived: Orphanages[i].amountReceived,
                totalAmountReceived: Orphanages[i].totalAmountReceived,
                noOfPeopleDonated: Orphanages[i].noOfPeopleDonated
            });
        }
        return OrphanageArray;
    }
}
