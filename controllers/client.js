
exports.getHomepage = (req, res) => {
    res.render('client/index', {
        activeLink: null,
        mainTitle: "Books"
    })
}