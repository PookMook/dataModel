const entities = require('../data/entities')
const authors = require('../data/authors')
const versions = require('../data/versions')

const { populateEntity, populateAuthor, populateVersion } = require('./nestedResolvers')

module.exports = {
    authors: () => {
        return authors.map(populateAuthor)
    },
    entities: () => {
        return entities.map(populateEntity)
    },
    versions: () => {
        return versions.map(populateVersion)
    }
}