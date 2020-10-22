const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    logo: DataTypes.STRING,
  }, {});
  Company.associate = (models) => {
    Company.hasOne(models.User);
    Company.hasOne(models.Profile);
    Company.hasMany(models.CatalogUser);
    Company.hasMany(models.Product);
  };

  SequelizeSlugify.slugifyModel(Company, {
    source: ['name'],
  });

  return Company;
};
