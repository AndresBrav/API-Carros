import db from '../db/connection'
import {DataTypes} from 'sequelize'

// define crea o usa 
const Producto = db.define("Producto",{
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.DOUBLE
    },
    stock:{
        type:DataTypes.NUMBER
    }
},
{
    createdAt:false, //para que no tenga la columna crear
    updatedAt:false //para que no tenga la columna update
}
)

export default Producto;