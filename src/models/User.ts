import { DataTypes, Model } from 'sequelize'; 
import sequelize from '../databases/config';

// These are all the attributes in the User model
interface UserAttributes {
    id: number;
    name: string;
    username: string;
    password: string;
    rol: string; 
}

class User extends Model implements UserAttributes {
    id!: number;
    name!: string;
    username!: string;
    password!: string;
    rol!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        username: {
            type: new DataTypes.STRING(150),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        rol: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
      tableName: "users",
      sequelize, // passing the `sequelize` instance is require 
    
    }
);

  
export default User;
