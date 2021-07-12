const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { }

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasMeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasDairy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasFish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasGluten: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cookTime: {
      type: DataTypes.SMALLINT,
    },
    prepTime: {
      type: DataTypes.SMALLINT,
    },
    marinadeTime: {
      type: DataTypes.SMALLINT,
    },
    servings: {
      type: DataTypes.TINYINT,
    },
    imgUrl: {
      type: DataTypes.STRING(1000),
    },
    recipeUrl: {
      type: DataTypes.STRING(1000),
    },
    ingredientsHtml: {
      type: DataTypes.STRING(1000),
    },
    instructions: {
      type: DataTypes.STRING(1000),
    },
    notes: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;
