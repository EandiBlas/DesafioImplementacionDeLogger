import ProductManager from "../persistencia/dao/managers/productManagerMongo.js";
import CustomError from "../errors/CustomError.js";
import {errorMessages} from "../errors/error.enum.js";

class ProductService {

    constructor() {
        this.product = new ProductManager();
    }

    addProduct = async (product) => {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.category || !product.stock || !product.code) {
            const customError = CustomError.createError(errorMessages.MISSING_DATA);
            return res.status(404).json({ error: customError.message });
        } 
        const verifyCode = await this.product.getProductByCode(product.code)
        if (verifyCode) {
            return "El codigo se repite"
        }
        return await this.product.addProduct(product);
    };

    getProduct = async (id) => {
        const product = await this.product.getProductById(id);
        const newProduct = { id: product._id, title: product.title, description: product.description, price: product.price, stock: product.stock, thumbnail: product.thumbnail, category: product.category }
        return newProduct;
    }

    getProducts = async (params) => {
        const options = {
          page: Number(params.query.page) || 1,
          limit: Number(params.query.limit) || 10,
          sort: { price: Number(params.query.sort) }
        };
      
        if (!(options.sort.price === -1 || options.sort.price === 1)) {
          delete options.sort
        }
      
        const categories = await this.product.categories()
        const result = categories.some(categ => categ === params.category)
        
        if (result) {
          return await this.product.getProducts({ category: params.category }, options);
        }
      
        return await this.product.getProducts({}, options);
    }

    updateProduct = async (id, product) => {
        const updateProduct = await this.product.updateProduct(id, product);
        return 'Producto Actualizado';
    };

    deleteProduct = async (id) => {
        const deleteProduct = await this.product.deleteProduct(id);
        if (deleteProduct) {
            return 'Producto Eliminado';
        } else {
            return 'Producto no encontrado';
        }
    };

}

export default ProductService