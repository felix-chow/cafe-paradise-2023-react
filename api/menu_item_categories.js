const express = require('express');
const { getMenuItemCategoryById, getMenuItemCategoriesByMenuItem, getMenuItemCategoriesByCategory, destroyMenuItemCategory, addCategoryToMenuItem } = require('../db/models');
const router = express.Router();
const { requireAdmin } = require('./utils');

router.get('/:menuItemCategoryId', async (req, res, next) => {
    try {
        const { menuItemCategoryId } = req.params;
        const menuItemCategory = await getMenuItemCategoryById(menuItemCategoryId)
        res.send(menuItemCategory);
        
    } catch (error) {
        next(error);
    }
});

router.get('/menu_item/:menuItemId', async (req, res, next) => {
    try {
        const { menuItemId } = req.params;
        const menuItemCategories = await getMenuItemCategoriesByMenuItem(menuItemId)
        res.send(menuItemCategories);
        
    } catch (error) {
        next(error);
    }
});

router.get('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const menuItemCategories = await getMenuItemCategoriesByCategory(categoryId)
        res.send(menuItemCategories);
        
    } catch (error) {
        next(error);
    }
});

router.post('/', requireAdmin, async (req, res, next) => {
    try {
        const { menuItemId, categoryId } = req.body;
        const category = await addCategoryToMenuItem({ menuItemId, categoryId })
        res.send(category);
        
    } catch (error) {
        next(error)
    }
});

router.delete('/:menuItemCategoryId', requireAdmin, async (req, res, next) => {
    try {
        const { menuItemCategoryId } = req.params;
        const deletedmenuItemCategory = await destroyMenuItemCategory(menuItemCategoryId)
        res.send(deletedmenuItemCategory);
        
    } catch (error) {
        next(error)
    }
});

module.exports = router;