import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'DogBite',
  timestamps: false,
  underscored: true,
})
export class DogBite extends Model<DogBite> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  // @Column({
  //   type: DataType.DATE,
  //   allowNull: false,
  // })
  // dateOfBite: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  breed: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  age: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isSpayed: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  borough: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  zipCode: string;
}
