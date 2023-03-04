const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser, updateUser, getAllUsers, setAdmin, deleteUser } = require('../db/models/users');
const { getOrdersByBuyerId } = require('../db/models/orders')
const bcrypt = require('bcrypt');
const { requireUser, requireAdmin } = require('./utils');


router.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});

router.post('/login', async (req, res, next) => {
    const { email, password } = await req.body;
    if (!email || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a email and password"
        });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            next({
                name: "NonExistentUser",
                message: "No user by that email exists. Please register before trying again"
            });
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (user && isValid) {
            const token = jwt.sign(user, process.env.JWT_SECRET);


            res.send({
                message: "you're logged in!",
                token,
                user
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'email or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.post('/register', async (req, res, next) => {
    const { email, password, address } = req.body;

    try {
        const _user = await getUserByEmail(email);
        if (_user) {
            next({
                error: 'UserExistsError',
                message: `That email is already taken`,
                name: 'UserExistsError'
            });
        }
        if (password.length < 8) {
            next({
                error: 'PasswordTooShort',
                message: 'Password Too Short!',
                name: 'PasswordTooShort'
            });
        }
        const user = await createUser({ email, password, address });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.json({
            message: "thank you for signing up",
            token,
            user
        });

    } catch ({ message, name }) {
        next({ message, name })
    }
});

router.get('/', requireAdmin, async (req, res, next) => {
    
    try {
        const users = await getAllUsers();
            res.send(
                users
            )

    }catch ({ message, name }) {
        next({ message, name })
    }
});

router.get('/me', requireUser, async (req, res, next) => {
    
    try {
        const { email } = req.user
        const user = await getUserByEmail(email)
            res.send(
                user
            )

    }catch ({ message, name }) {
        next({ message, name })
    }
});

router.get('/:userId/orders', requireUser, async (req, res, next) => {
    const {userId} = req.params;
    try{
        const orders = await getOrdersByBuyerId(userId);
        if(orders){
            res.send(
                orders
            );
        } else{
            next({
                message: `No orders found for ${userId}`,
                name: "NoOrdersFound"
            })
        }
    } catch ({ message, name }) {
    next({ message, name })
    }
});

router.patch('/:userId', requireUser, async (req, res, next) => {
    const { email, address } = req.body;
    const { userId } = req.params;

    try {
        const updatedUser = await updateUser({ id:userId, email, address });
        
        res.send(
            updatedUser
        );

    } catch ({ message, name }) {
        next({ message, name });
    }
});

router.patch('/admin/:userId', async (req, res, next) => {
    const { isAdmin } = req.body;
    const { userId } = req.params;
    
    try {
        const updatedUser = await setAdmin({ id:userId, isAdmin });
        
        res.send(
            updatedUser
        );

    } catch ({ message, name }) {
        next({ message, name });
    }
});

router.delete('/delete/:userId', requireAdmin, async ( req, res, next ) => {
    const { userId } = req.params;
    const id = userId;

    try {
        const user = await deleteUser(id);
        res.send(user);

    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = router;
