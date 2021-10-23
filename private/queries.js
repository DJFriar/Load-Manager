const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

module.exports.queryAllUsers = async function queryAllUsers(user = false) {
  try {
    if (user) {
      var result = await db.User.findAll({
        raw: true,
        where: {
          id: user
        }
      })
    } else {
      var result = await db.User.findAll({
        raw: true,
      })
    }
    return result;
  } catch (err) {
    throw err;
  }
}