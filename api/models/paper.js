const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Paper extends Model { }
  Paper.init({
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
          msg: 'A title for the course is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the course.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A course description is required.'
        },
        notEmpty: {
          msg: 'Please provide a course description.'
        }
      }
    },
    authors: {
      type: DataTypes.STRING
    },
    conference: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    }
  }, { sequelize });

  Paper.associate = (models) => {
    Paper.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false, 
      }
    });
  }

  return Paper;
}