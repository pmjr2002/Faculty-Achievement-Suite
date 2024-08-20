const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Patent extends Model { }
  Patent.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title for the patent is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the patent.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A patent description is required.'
        },
        notEmpty: {
          msg: 'Please provide a patent description.'
        }
      }
    },
    inventors: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
    patentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A number for the patent is required.'
          },
          notEmpty: {
            msg: 'Please provide a number for the patent.'
          }
        }
      },
  }, { sequelize });

  Patent.associate = (models) => {
    Patent.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false, 
      }
    });
  }

  return Patent;
}