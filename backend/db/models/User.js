module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    membershipDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "librarian", "member"),
      defaultValue: "member",
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    jwtTokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

  return User;
};
