const Book = require('../model/Book')
const Category = require('../model/Category')
const Author = require('../model/Author')

// Get Books
exports.getBooksInventory = (req, res) => {
    Book.find({deleted:0})
    .populate('category_id author_id', 'name fullname')
    .then(books => {
        Author.find({deleted:0}, 'fullname')
        .then(authors => {
            return authors
        })
        .then(authors => {
            Category.find({deleted:0}, 'name')
            .then(categories => {
                res.render('admin/book-inventory', {
                    activeLink: "book-inventory",
                    books: books,
                    book: null,
                    authors: authors,
                    categories: categories,
                    mainTitle: "Add New Book"
                })
            })
        })
        
    })
    .catch(err => console.log(err))
    
}

exports.getBookInventory = (req, res) => {
    const id = req.params.bookID
    Book.find({deleted:0})
    .populate('category_id author_id', 'name fullname')
    .then(books => {
        Author.find({deleted:0}, 'fullname')
        .then(authors => {
            return authors
        })
        .then(authors => {
            Category.find({deleted:0}, 'name')
            .then(categories => {
                Book.findById(id)
                .then(book => {
                    res.render('admin/book-inventory', {
                        activeLink: "book-inventory",
                        books: books,
                        book: book,
                        authors: authors,
                        categories: categories,
                        mainTitle: "Update Book"
                    })
                })
            })
        })
        
    })
    .catch(err => console.log(err))

}

// add new book
exports.postBookInventory = (req, res) => {
    // get data from Inputs
    const bookID = req.body.bookID
    const bookName = req.body.bookName
    const bookLanguage = req.body.bookLanguage
    const authorID = req.body.authorID
    const edition = req.body.edition
    const pages = req.body.pages
    const categoryID = req.body.categoryID
    const publishDate = req.body.publishDate
    const description = req.body.description
    const bookCover = req.files.bookCover[0]
    const bookCoverURL = bookCover.path

    // insert data into DB
    const book = new Book({
        id: bookID, 
        name: bookName, 
        language: bookLanguage,
        author_id: authorID,
        edition: edition,
        pages: pages,
        category_id: categoryID,
        publishdate: publishDate,
        bookCover: bookCoverURL,
        description: description
    })
    book.save()
    .then(()=>{
        res.redirect('/admin/book-inventory')
    })
    .catch(err => console.log(err))

}

// update book document
exports.postUpdateBookInventory = (req, res) => {
    const _id = req.body._id
    const updateBookID = req.body.bookID
    const updateBookName = req.body.bookName
    const updateBookLanguage = req.body.bookLanguage
    const updateAuthorID = req.body.authorID
    const updateEdition = req.body.edition
    const updatePages = req.body.pages
    const updateCategoryID = req.body.categoryID
    const updatePublishDate = req.body.publishDate
    const updateDescription = req.body.description
    const updateBookCover = req.files
    const updateBookCoverURL = (updateBookCover.bookCover)? updateBookCover.bookCover[0].path : req.body.currentImg
    
    Book.findById(_id)
    .then(book => {
        book.id = updateBookID
        book.name = updateBookName
        book.language = updateBookLanguage
        book.author_id = updateAuthorID
        book.edition = updateEdition
        book.pages = updatePages
        book.category_id = updateCategoryID
        book.publishdate = updatePublishDate
        book.description = updateDescription
        book.bookCover = updateBookCoverURL

        return book.save()
    })
    .then(()=>{
        res.redirect('/admin/book-inventory')
    })
    .catch(err => console.log(err))
}

// delete book document
exports.postDeleteBookInventory = (req, res) => {
    const _id = req.body.id
    Book.findById(_id)
    .then(book => {
        book.deleted = 1

       return book.save()
    })
    .then(()=>{
        res.redirect('/admin/book-inventory')
    })
    .catch(err => console.log(err))
}

// Get Categories
exports.getCategoris = (req, res) => {
    Category.find({deleted:0})
    .then(categories => {
        res.render('admin/category', {
            activeLink: "category",
            categories: categories,
            category: null,
            mainTitle: "Add New Category"
        })
    })
    .catch(err => console.log(err))
}

// insert new category
exports.postAddCategory = (req, res) => {
    const name = req.body.name

    const category = new Category({
        name: name
    })
    category.save()
    .then(result => {
        res.redirect("/admin/category")
    })
    .catch(err => console.log(err))
}

// Get Category by Id
exports.getCategory = (req, res) => {
    const id = req.params.categoryID
    
    Category.find({deleted:0})
    .then(categories => {
        Category.findById(id)
        .then(category => {
            res.render('admin/category', {
                activeLink: "category",
                categories: categories,
                category: category,
                mainTitle: "Edit Category"
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// update category
exports.postUpdateCategory = (req, res) => {
    const id = req.body.id
    const nameUdated = req.body.name

    Category.findById(id)
    .then(category => {
        category.name = nameUdated

       return category.save()
    })
    .then(result => {
        res.redirect('/admin/category')
    })
    .catch(err => console.log(err))
}

// delete category
exports.postDeleteCategory = (req, res) => {
    const id = req.body.id

    Category.findById(id)
    .then(category => {
        category.deleted = 1

       return category.save()
    })
    .then(result => {
        res.redirect('/admin/category')
    })
    .catch(err => console.log(err))
}

// Get Authors
exports.getAuthors = (req, res) => {
    Author.find({deleted:0})
    .then(authors => {
        res.render('admin/author', {
            activeLink: "author",
            authors: authors,
            author: null,
            mainTitle: "Add New Author"
        })
    })
    .catch(err => console.log(err))
}

// insert new Author
exports.postAddAuthor = (req, res) => {
    // get data from inputs
    const id = req.body.authorID
    const fullname= req.body.fullname
    const dob = req.body.dob
    const email = req.body.email
    const linkedin = req.body.linkedin
    const twitter = req.body.twitter
    const facebook = req.body.facebook
    const bio = req.body.bio
    const profile = req.files.profile[0]
    const profileURL = profile.path

    // inset data into DB
    const author = new Author({
        id: id, 
        fullname: fullname, 
        dob: dob,
        email: email,
        linkedin: linkedin,
        twitter: twitter,
        facebook: facebook,
        bio: bio,
        profile: profileURL
    })
    author.save()
    .then(result => {
        res.redirect("/admin/author")
    })
    .catch(err => console.log(err))
}

// Get Author by ID
exports.getAuthor = (req, res) => {
    const id = req.params.authorID
    
    Author.find({deleted:0})
    .then(authors => {
        Author.findById(id)
        .then(author => {
            res.render('admin/author', {
                activeLink: "author",
                authors: authors,
                author: author,
                mainTitle: "Edit Author"
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// Update Author document
exports.postUpdateAuthor = (req, res) => {
    // get data from inputs
    const _id = req.body.id
    const idUpdated = req.body.authorID
    const fullnameUpdated = req.body.fullname
    const dobUpdated = req.body.dob
    const emailUpdated = req.body.email
    const linkedinUpdated = req.body.linkedin
    const twitterUpdated = req.body.twitter
    const facebookUpdated = req.body.facebook
    const bioUpdated = req.body.bio
    const profileUpdated = req.files
    const profileURLUpdated = (profileUpdated.profile)? profileUpdated.profile[0].path : req.body.currentImg

    // update data into DB
    Author.findById(_id)
    .then(author => {
        author.id = idUpdated, 
        author.fullname= fullnameUpdated, 
        author.dob = dobUpdated,
        author.email = emailUpdated,
        author.linkedin = linkedinUpdated,
        author.twitter = twitterUpdated,
        author.facebook = facebookUpdated,
        author.bio = bioUpdated,
        author.profile = profileURLUpdated

        return author.save()
    })
    .then(result => {
        res.redirect("/admin/author")
    })
    .catch(err => console.log(err))
}

// delete author document
exports.postDeleteAuthor = (req, res) => {
    const id = req.body.id

    Author.findById(id)
    .then(author => {
        author.deleted = 1

       return author.save()
    })
    .then(result => {
        res.redirect('/admin/author')
    })
    .catch(err => console.log(err))
}