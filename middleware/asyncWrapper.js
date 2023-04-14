const asyncWrapper = (queryFxn) => {
    return async (req, res, next) => {
        try {
            await queryFxn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper