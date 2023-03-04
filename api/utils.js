function requireAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(401).send({
            error: '401',
            name: 'UnauthorizedUser',
            message: "You must be an administrator to perform this action"
        });
    }

    next();
}

function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401)
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }

    next();
}

module.exports = {
    requireAdmin,
    requireUser
}