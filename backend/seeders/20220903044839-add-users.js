'use strict';
const bcrypt = require('bcryptjs');
const {ROLES} = require('./../config/constant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [{
      role: ROLES.Admin,
      first_name: "admin",
      last_name: "admin",
      mobile: "91913710445",
      email: "admin@yopmail.com",
      password: await bcrypt.hash("abcd@1234", 10),// password abcd
      isActive: true,
      attempts: 10,
      terms: true,
      image: "avatar.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // {
    //   role: ROLES.Donor,
    //   first_name: "donor",
    //   last_name: "donor",
    //   mobile: "91813710445",
    //   email: "donor@yopmail.com",
    //   password: await bcrypt.hash("abcd@1234", 10),// password abcd
    //   isActive: true,
    //   attempts: 10,
    //   terms: true,
    //   image: "avatar.png",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   role: ROLES.HowAdmin,
    //   first_name: "howadmin",
    //   last_name: "howadmin",
    //   mobile: "91713710445",
    //   email: "howadmin@yopmail.com",
    //   password: await bcrypt.hash("abcd@1234", 10),// password abcd
    //   isActive: true,
    //   attempts: 10,
    //   terms: true,
    //   image: "avatar.png",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   role: ROLES.User,
    //   first_name: "user",
    //   last_name: "user",
    //   mobile: "91613710445",
    //   email: "user@uopmail.com",
    //   password: await bcrypt.hash("abcd@1234", 10),// password abcd
    //   isActive: true,
    //   attempts: 10,
    //   terms: true,
    //   image: "avatar.png",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }
  ]

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
