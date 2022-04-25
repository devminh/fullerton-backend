const { Service } = require("../../system/services/Service");
const autoBind = require("auto-bind");
const { HttpResponse } = require("../../system/helpers/HttpResponse");

class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }

  async updatePassword(id, data) {
    const user = await this.model.findById(id).select("+password");
    const passwordMatched = await user.comparePassword(data.current_password);

    if (!passwordMatched) {
      return { passwordChanged: false, status: "Invalid current password" };
    }
    try {
      await this.model.findByIdAndUpdate(id, data, { new: true });
      return { passwordChanged: true };
    } catch (errors) {
      throw errors;
    }
  }

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
