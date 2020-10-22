module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    logo: {
      type: Sequelize.STRING,
    },
    primaryColor: {
      type: Sequelize.STRING,
    },
    secondColor: {
      type: Sequelize.STRING,
    },
    background: {
      type: Sequelize.STRING,
    },
    companyId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Profiles'),
};
