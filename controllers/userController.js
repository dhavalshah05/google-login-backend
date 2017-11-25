exports.login = (req, res) => {
    let data = {
        success: true,
        status: 200,
        googleUserId: req.googleUserId
    };
    res.status(200).json(data);
};