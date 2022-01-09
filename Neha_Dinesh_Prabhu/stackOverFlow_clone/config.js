module.exports = {
    port: process.env.PORT || 8080,
    db: {
        url: process.env.DATABASE_URL || 'mongodb://localhost/stackoverflow'
    }
}