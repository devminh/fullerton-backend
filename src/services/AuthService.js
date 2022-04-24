"use strict";
const { UserService } = require("./UserService");
const autoBind = require("auto-bind");
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const mongoose = require("mongoose");

class AuthService {
  constructor(model, userModel) {
    this.model = model;
    this.userService = new UserService(userModel);
    autoBind(this);
  }

  /**
   *
   * @param username: String
   * @param password: String
   * @returns {Promise<any>}
   */
  async login(username, password) {
    const user = await this.userService.findByUserName(username, true);

    if (!user) {
      // User not found
      const error = new Error("Invalid username");

      error.statusCode = 422;
      throw error;
    } else {
      // Process Login
      try {
        // Check Password
        const passwordMatched = await user.comparePassword(password);

        if (!passwordMatched) {
          const error = new Error("Invalid Password");

          error.statusCode = 422;
          throw error;
        }
        const token = await this.model.generateToken(user);

        await this.model.create({
          token,
          user: new mongoose.mongo.ObjectId(user._id),
        });
        const tokenData = await this.model
          .findOne({ token: token })
          .populate("user");

        return new HttpResponse(tokenData);
      } catch (e) {
        throw e;
      }
    }
  }

  async register(data) {
    try {
      return await this.userService.insert(data);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id, data) {
    try {
      const updatedPassword = await this.userService.updatePassword(id, data);
      if (updatedPassword.passwordChanged === false) {
        return new HttpResponse(updatedPassword, { statusCode: 400 });
      }
      return new HttpResponse(updatedPassword);
    } catch (error) {
      throw error;
    }
  }

  async logout(token) {
    try {
      await this.model.deleteOne({ token });
      return new HttpResponse({ logout: true });
    } catch (error) {
      throw error;
    }
  }

  async checkLogin(token) {
    try {
      // Check if the token is in the Database
      const tokenInDB = await this.model.countDocuments({ token });

      if (!tokenInDB) {
        const error = new Error("Invalid Token");

        error.statusCode = 401;
        throw error;
      }
      // Check the token is a valid JWT
      const user = await this.model.decodeToken(token);

      if (!user) {
        const error = new Error("Invalid Token");

        error.statusCode = 401;
        throw error;
      }
    } catch (e) {
      const error = new Error("Invalid Token");

      error.statusCode = 401;
      throw error;
    }
  }
}

module.exports = { AuthService };
