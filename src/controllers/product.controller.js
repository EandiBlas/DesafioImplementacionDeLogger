import ProductService from "../services/product.services.js";
import CustomError from "../errors/CustomError.js";
import {errorMessages} from "../errors/error.enum.js";
import logger from "../winston.js";

class ProductController{
    constructor(){
        this.service = new ProductService();
    }

    addProduct = async (req, res) => {
        try {
            const addProduct = await this.service.addProduct(req.body);
            res.status(200).json(addProduct);
        } catch (error) {
            const customError = CustomError.createError(errorMessages.MISSING_DATA);
            logger.error('Error los campos requeridos no fueron completados //loggerTest//');
            return res.status(404).json({ error: customError.message });
        }
    };
    
    getProduct = async (req, res) => {
        try{
            const product = await this.service.getProduct(req.params.pid);
            res.status(200).json(product);
        }catch(error){
            const customError = CustomError.createError(errorMessages.PRODUCT_NOT_FOUND);
            logger.error('Error el producto buscado no existe //loggerTest//');
            return res.status(404).json({ error: customError.message });
        }
    }

    getAllProducts = async (req, res) => {
        try {
          const params = {
            query: req.query,
            category: req.query.category
          };
      
          const products = await this.service.getProducts(params);
        
          let prevLink;
          let nextLink;
          
          if (req.originalUrl.includes('page')) {
            prevLink = products.hasPrevPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.prevPage}`) : null;
            nextLink = products.hasNextPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.nextPage}`) : null;
          } else if (!req.originalUrl.includes('?')) {
            prevLink = products.hasPrevPage ? req.originalUrl.concat(`?page=${products.prevPage}`) : null;
            nextLink = products.hasNextPage ? req.originalUrl.concat(`?page=${products.nextPage}`) : null;
          } else {
            prevLink = products.hasPrevPage ? req.originalUrl.concat(`&page=${products.prevPage}`) : null;
            nextLink = products.hasNextPage ? req.originalUrl.concat(`&page=${products.nextPage}`) : null;
          }
      
          const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
          
          return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
        } catch(error){
            const customError = CustomError.createError(errorMessages.GET_PRODUCTS_ERROR);
            logger.error('Error al traer todos los productos //loggerTest//');
            return res.status(404).json({ error: customError.message });
        }
    }
      


    updateProduct = async (req, res) => {
        try {
            const updateProduct = await this.service.updateProduct(req.params.pid, req.body);
            res.status(200).json(updateProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    deleteProduct = async (req, res) => { 
        try {
            const deleteProduct = await this.service.deleteProduct(req.params.pid);
            res.status(200).json(deleteProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default ProductController