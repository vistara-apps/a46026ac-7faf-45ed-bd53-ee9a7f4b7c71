// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TrackerToken
 * @dev ERC-20 token for Tracker Tokens platform
 * Users earn tokens by blocking trackers and opting into privacy-preserving data sharing
 */
contract TrackerToken is ERC20, Ownable, ReentrancyGuard {
    // Events
    event TokensEarned(address indexed user, uint256 amount, string reason);
    event TokensSpent(address indexed user, uint256 amount, string reason);
    event PrivacyActionRecorded(address indexed user, string actionType);

    // Constants
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant TRACKER_BLOCK_REWARD = 10**16; // 0.01 tokens per tracker
    uint256 public constant DATA_SHARING_REWARD = 10**17; // 0.1 tokens per data sharing action
    uint256 public constant ATTENTION_REWARD = 5 * 10**16; // 0.05 tokens per attention action

    // Mappings
    mapping(address => uint256) public lastActivityTimestamp;
    mapping(address => uint256) public totalEarned;
    mapping(address => uint256) public totalSpent;
    mapping(address => bool) public isAuthorizedMinter;

    // Modifiers
    modifier onlyAuthorized() {
        require(isAuthorizedMinter[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    modifier activityCooldown() {
        require(
            block.timestamp >= lastActivityTimestamp[msg.sender] + 1 hours,
            "Activity cooldown active"
        );
        _;
    }

    constructor() ERC20("Tracker Token", "TT") {
        // Mint initial supply to owner for distribution
        _mint(msg.sender, 100_000_000 * 10**18); // 100 million tokens
        isAuthorizedMinter[msg.sender] = true;
    }

    /**
     * @dev Earn tokens for blocking trackers
     * @param user Address of the user
     * @param trackerCount Number of trackers blocked
     */
    function earnForBlocking(address user, uint256 trackerCount)
        external
        onlyAuthorized
        nonReentrant
        activityCooldown
    {
        require(trackerCount > 0, "Invalid tracker count");
        uint256 reward = trackerCount * TRACKER_BLOCK_REWARD;

        // Check max supply
        require(totalSupply() + reward <= MAX_SUPPLY, "Max supply exceeded");

        _mint(user, reward);
        totalEarned[user] += reward;
        lastActivityTimestamp[user] = block.timestamp;

        emit TokensEarned(user, reward, "tracker_blocking");
        emit PrivacyActionRecorded(user, "tracker_blocked");
    }

    /**
     * @dev Earn tokens for data sharing
     * @param user Address of the user
     */
    function earnForDataSharing(address user)
        external
        onlyAuthorized
        nonReentrant
        activityCooldown
    {
        uint256 reward = DATA_SHARING_REWARD;

        // Check max supply
        require(totalSupply() + reward <= MAX_SUPPLY, "Max supply exceeded");

        _mint(user, reward);
        totalEarned[user] += reward;
        lastActivityTimestamp[user] = block.timestamp;

        emit TokensEarned(user, reward, "data_sharing");
        emit PrivacyActionRecorded(user, "data_shared");
    }

    /**
     * @dev Earn tokens for attention-based actions
     * @param user Address of the user
     */
    function earnForAttention(address user)
        external
        onlyAuthorized
        nonReentrant
        activityCooldown
    {
        uint256 reward = ATTENTION_REWARD;

        // Check max supply
        require(totalSupply() + reward <= MAX_SUPPLY, "Max supply exceeded");

        _mint(user, reward);
        totalEarned[user] += reward;
        lastActivityTimestamp[user] = block.timestamp;

        emit TokensEarned(user, reward, "attention_focus");
        emit PrivacyActionRecorded(user, "attention_given");
    }

    /**
     * @dev Spend tokens (for premium features, etc.)
     * @param amount Amount to spend
     * @param reason Reason for spending
     */
    function spendTokens(uint256 amount, string memory reason)
        external
        nonReentrant
    {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _burn(msg.sender, amount);
        totalSpent[msg.sender] += amount;

        emit TokensSpent(msg.sender, amount, reason);
    }

    /**
     * @dev Add authorized minter
     * @param minter Address to authorize
     */
    function addAuthorizedMinter(address minter) external onlyOwner {
        isAuthorizedMinter[minter] = true;
    }

    /**
     * @dev Remove authorized minter
     * @param minter Address to remove authorization
     */
    function removeAuthorizedMinter(address minter) external onlyOwner {
        isAuthorizedMinter[minter] = false;
    }

    /**
     * @dev Get user statistics
     * @param user Address of the user
     */
    function getUserStats(address user) external view returns (
        uint256 balance,
        uint256 earned,
        uint256 spent,
        uint256 lastActivity
    ) {
        return (
            balanceOf(user),
            totalEarned[user],
            totalSpent[user],
            lastActivityTimestamp[user]
        );
    }

    /**
     * @dev Emergency withdraw (only owner)
     * @param tokenAddress Address of token to withdraw
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address tokenAddress, uint256 amount) external onlyOwner {
        if (tokenAddress == address(0)) {
            payable(owner()).transfer(amount);
        } else {
            IERC20(tokenAddress).transfer(owner(), amount);
        }
    }
}

