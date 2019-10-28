const data = require('../data/circular')

module.exports = {
    authors: () => {
        return data.authors
    },
    entities: () => {
        return data.entities
    },
    versions: () => {
        return data.versions
    }
}