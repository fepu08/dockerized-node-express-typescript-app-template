import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../../../config/sequelize-config';

export interface DummyAttributes {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DummyCreationAttributes extends Omit<DummyAttributes, 'id'> {}

class Dummy extends Model<DummyAttributes, DummyCreationAttributes> {
  declare id: string;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Dummy.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Dummy',
    tableName: 'Dummies',
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: {
        include: ['createdAt', 'updatedAt'],
      },
    },
  },
);

export { Dummy as DummyModel };
