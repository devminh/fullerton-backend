"use strict";
const { Service } = require("../../system/services/Service");
const autoBind = require("auto-bind");

class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }

  async updatePassword(id, data) {
    try {
      await this.model.findByIdAndUpdate(id, data, { new: true });
      return { passwordChanged: true };
    } catch (errors) {
      throw errors;
    }
  }

  async registerUser(data) {}

  /**
   *
   * @param username : string
   * @param includePassword : boolean
   * @returns {Promise<*>}
   */
  async findByUserName(username, includePassword = false) {
    return includePassword
      ? this.model.findByUserName(username).select("+password")
      : this.model.findByUserName(username);
  }
}

module.exports = { UserService };
