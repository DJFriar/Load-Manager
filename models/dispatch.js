module.exports = function(sequelize, DataTypes) {
  const Dispatch = sequelize.define("Dispatch", {
    TruckID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Pickup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LoadType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LoadCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DispatchNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PaymentPerTon: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false
    },
    Notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return Dispatch;
};
