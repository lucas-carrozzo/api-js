'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "userId", {
      type: Sequelize.DataTypes.INTEGER,
    },)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn("Tasks", "userId")
  }
};
