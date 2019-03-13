module.exports = function(sequelize, DataTypes) {
  const Cookie = sequelize.define("Cookie", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Cookie;
};