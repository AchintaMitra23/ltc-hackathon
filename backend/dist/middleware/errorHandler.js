export const errorHandler = (err, req, res, next) => {
    console.error('Error caught by middleware:', err);
    res.status(500).json({ status: 500, body: { error: 'Internal server error' } });
};
