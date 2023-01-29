module.exports = {
    serverError(res, error) {
        return res.status(501).send(`${error}`)
    },
    resourceError(res, message) {
        return res.status(400).send(`${message}`);
    }

}