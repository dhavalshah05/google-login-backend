exports.login = (req, res) => {
    let data = {
        success: true,
        status: 200,
        googleUserId: req.user.googleUserId,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture
    };
    res.status(200).json(data);
};