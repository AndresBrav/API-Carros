import { Request,Response } from "express"
import Producto from "../models/producto"

export const getProducts = async(req:Request,res:Response) => {

    const listProducts = await Producto.findAll()
    res.json(listProducts)
}

export const getProduct = async(req:Request,res:Response) => {

    const {id} = req.params

    const product = await Producto.findByPk(id)

    if(product){
        res.json(product)
    }
    else{
        res.status(404).json({
            msg:"no existe el producto"
        })
    }

}

export const deleteProduct = async(req:Request,res:Response) => {
    const {id} = req.params

    const product = await Producto.findByPk(id)

    if(!product){
        res.status(404).json({
            msg: `no existe el producto ${id}`
        })
    }else{
        await product.destroy();
        res.json({
            msg:'el producto fue eliminado con exito'
        })
    }
    
}

export const postProduct = async (req:Request,res:Response) => {
    const {body} = req
    await Producto.create(body)

    res.json({
        msg: 'el producto fue agregado con exito',
        body
    })
}

export const updateProduct = async(req:Request,res:Response) => {
    const {id} = req.params
    const {body} = req

    const product = await Producto.findByPk(id)
    if(product){
        await product.update(body)
        res.json({
            msg: " el producto fue actualizado con exito "
        })
    }
    else{
        res.status(404).json({
            msg: " no existe el producto con el id"
        })
    }
    
}