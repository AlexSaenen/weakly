export const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM,
      values: daysOfTheWeek,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    time: { // minutes
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: (24 * 60) - 1,
      },
    },
    duration: { // minutes
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });

  // Task.associate = (models) => {
  // };

  return Task;
};

// TODO: make day a model
