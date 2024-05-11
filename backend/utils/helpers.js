const bcrypt = require("bcrypt");
const userModel = require("../Schems/user");
const boardModel = require("../Schems/board");

module.exports.CreateUser = async (email, fname, password) => {
  try {
    let newUser = new userModel({
      email: email,
      fname: fname,
      password: password,
    });
    await newUser.save();
    return { status: true, data: newUser };
  } catch (e) {
    return { status: false, data: e };
  }
};
module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error occurred while hashing password");
  }
};
module.exports.compareHashed = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
};

module.exports.CheckIsMember = async (boardId, userEntity) => {
  const board = await boardModel.findOne({ _id: boardId });
  if (!board) throw new Error("invailed board ID");
  let user = board.users.find((user) => user._id == userEntity._id);
  if (!user) throw new Error("Access denied");
  return board;
};
module.exports.CheckIsMemberAndOwner = async (boardId, userEntity) => {
  const board = await boardModel.findOne({ _id: boardId });
  if (!board) throw new Error("invailed board ID");
  let user = board.users.find(
    (user) => user._id == userEntity._id && user.role == "owner"
  );
  if (!user) throw new Error("Access denied");
  return board;
};
module.exports.deleteUserFromBoard = async (boardId, userId) => {
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) throw new Error("invailed User ID");
    let board = user.boards.find((board) => board.id == boardId);
    if (!board) throw new Error("User its not member in the board");
    user.boards = user.boards.filter((board) => board.id != boardId);
    await user.save();
    return true;
  } catch (e) {
    console.log(e);
  }
};
module.exports.renameBoard = async (boardId, userId, newTitle) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("Invalid User ID");

    const boardIndex = user.boards.findIndex((board) => board.id == boardId);
    if (boardIndex === -1) throw new Error("Can't find board");

    user.boards[boardIndex] = { ...user.boards[boardIndex], title: newTitle };
    await user.save(); // Save the updated user object
    console.log(user);
    return true;
  } catch (error) {
    console.error("Error renaming board:", error.message);
    return false;
  }
};

module.exports.inviteHelper = async (boardId, userEntity, userId) => {
  "";

  const board = await boardModel.findOne({ _id: boardId });
  if (!board) throw new Error("invailed board ID");
  let user = board.users.find((user) => user._id == userEntity._id);
  if (!user) throw new Error("Access denied");

  let alreadyThere = board.users.find((user) => user._id == userId);
  if (alreadyThere) throw new Error("user already in the board");

  return board;
};
module.exports.kickUser = async (boardId, userEntity, userId) => {
  try {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) throw new Error("invailed board ID");
    let user = board.users.find(
      (user) => user._id == userEntity._id && user.role == "owner"
    );
    if (!user) throw new Error("Access denied");
    let isUser = board.users.find(
      (user) => user._id == userId && user.role != "owner"
    );
    if (!isUser) throw new Error("This user can't be kicked");
    await module.exports.deleteUserFromBoard(boardId, userId);
    board.users = board.users.filter((user) => user._id != userId);
    await board.save();
    return true;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports.getSenderAndBoardNames = async (senderId, boardId, inviteId) => {
  try {
    // Fetch the sender's name
    const sender = await userModel.findById(senderId);
    const senderName = sender.fname;

    // Fetch the board's name
    const board = await boardModel.findById(boardId);
    const boardName = board.title;

    return { senderName, boardName, inviteId };
  } catch (error) {
    console.error("Error fetching sender or board:", error);
    return null;
  }
};
