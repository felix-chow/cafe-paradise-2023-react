const express = require('express');
const { getAllCategories, getCategoryByName, getCategoryById, addCategory, updateCategory, destroyCategory } = require('../db/models');
const router = express.Router();
const { requireAdmin } = require('../api/utils');

router.use((req, res, next) => {
    console.log("A request is being made to /categories");
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
        
    } catch (error) {
        next(error);
    }
});

router.get('/name/:categoryName', async (req, res, next) => {
    try {
        const { categoryName } = req.params;
        const category = await getCategoryByName(categoryName)
        res.send(category);
        
    } catch (error) {
        next(error);
    }
});

router.get('/id/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await getCategoryById(categoryId)
        res.send(category);
        
    } catch (error) {
        next(error);
    }
});

router.post('/', requireAdmin, async (req, res, next) => {
    try {
        const { name, imageURL } = req.body;
        const _category = await getCategoryByName(name)
        if (_category) {
            next({
                name: 'CategoryExistsError',
                message: `An category with name ${name} and ${imageURL} already exists`
            });
        }
        else {
            const category = await addCategory({ name, imageURL })
            res.send(category);
        }
    } catch (error) {
        next(error)
    }
});


router.patch('/:categoryId', requireAdmin, async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { oldName, name } = req.body;
        const nameLowerCase = name.toLowerCase();
        const _category = await getCategoryByName(nameLowerCase);
        const originalCategory = await getCategoryById(categoryId);
        const id = categoryId;

        if (!originalCategory) {
            next({
                name: 'CategoryDoesNotExist',
                message: `Category ${categoryId} not found`
            });
        }
        else if(_category && _category.name !== oldName) {
            next({
                name: 'CategoryExistsError',
                message: `An Category with name ${name} already exists`
            });
        }
        else {
            const updatedCategory = await updateCategory({ id, name })
            res.send(updatedCategory)
        }

    } catch (error) {
        next(error)
    }
});

router.delete('/:categoryId', requireAdmin, async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await destroyCategory(categoryId)
        res.send(deletedCategory);
        
    } catch (error) {
        next(error)
    }
});

module.exports = router;