// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gym {
    event LogWithdrawn(uint256 balance);
    event LogPayment(
        address client,
        address owner,
        uint256 day,
        uint256 amount
    );
    event LogRegisteredUnavailableDay(address owner, uint256 day);
    event LogUnregisteredUnavailableDay(address owner, uint256 day);

    address public owner;
    address public paymentToken;
    uint256 public paymentTraining;
    uint256 public maxClientsPerDay;

    mapping(uint256 => bool) public unavailableDaysMap;
    // start of day timestamp => clients that will have a training at that day
    mapping(uint256 => address[]) public trainingDaysMap;

    modifier onlyOwner() {
        require(msg.sender == owner, "ERROR::AUTH");
        _;
    }

    constructor(
        address owner_,
        address paymentToken_,
        uint256 paymentTraining_,
        uint256 maxClientsPerDay_
    ) {
        owner = owner_;
        paymentToken = paymentToken_;
        paymentTraining = paymentTraining_;
        maxClientsPerDay = maxClientsPerDay_;
    }

    function registerUnavailableDay(uint256 dayTimestamp) external onlyOwner {
        uint256 day = _getStartOfDay(dayTimestamp);

        require(
            !unavailableDaysMap[day],
            "ERROR::UNAVAILABLE_DAY_ALREADY_REGISTERED"
        );
        require(trainingDaysMap[day].length == 0, "ERROR::DAY_ALREADY_BOOKED");

        unavailableDaysMap[day] = true;

        emit LogUnregisteredUnavailableDay(msg.sender, day);
    }

    function unregisterUnavailableDay(uint256 dayTimestamp) external onlyOwner {
        uint256 day = _getStartOfDay(dayTimestamp);

        require(!!unavailableDaysMap[day], "ERROR::DAY_ALREADY_AVAILABLE");

        unavailableDaysMap[day] = false;

        emit LogUnregisteredUnavailableDay(msg.sender, day);
    }

    function pay(uint256 dayTimestamp) external {
        uint256 day = _getStartOfDay(dayTimestamp);

        require(!unavailableDaysMap[day], "ERROR::DAY_NOT_AVAILABLE");
        require(
            trainingDaysMap[day].length < maxClientsPerDay,
            "ERROR::DAY_ALREADY_MAX_CLIENTS"
        );
        require(
            !_hasClientOnDate(dayTimestamp, msg.sender),
            "ERROR:ALREADY_TRAIN"
        );

        trainingDaysMap[day].push(msg.sender);

        IERC20(paymentToken).transferFrom(
            msg.sender,
            address(this),
            paymentTraining
        );

        emit LogPayment(msg.sender, address(this), day, paymentTraining);
    }

    function withdraw() external onlyOwner {
        uint256 balance = IERC20(paymentToken).balanceOf(address(this));
        IERC20(paymentToken).transferFrom(address(this), owner, balance);
        emit LogWithdrawn(balance);
    }

    function canTrainToday(address client) external view returns (bool) {
        return _hasClientOnDate(block.timestamp, client);
    }

    function canTrainAtDate(address client, uint256 timestamp)
        external
        view
        returns (bool)
    {
        return _hasClientOnDate(timestamp, client);
    }

    function _getStartOfDay(uint256 timestamp) private pure returns (uint256) {
        uint256 secondsFromDayStart = timestamp % (60 * 60 * 24);
        return timestamp - secondsFromDayStart;
    }

    function _hasClientOnDate(uint256 timestamp, address client)
        private
        view
        returns (bool)
    {
        bool canTrain = false;

        uint256 day = _getStartOfDay(timestamp);
        for (uint256 i = 0; i < trainingDaysMap[day].length; i++) {
            if (trainingDaysMap[day][i] == client) {
                canTrain = true;
                break;
            }
        }

        return canTrain;
    }
}
