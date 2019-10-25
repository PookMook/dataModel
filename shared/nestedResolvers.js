const entities = require('../data/entities')
const authors = require('../data/authors')
const versions = require('../data/versions')

const getAuthorsByIds = ids => {
    return authors.filter(a=>ids.includes(a.id)).map(populateAuthor)
}

const getVersionsByIds = ids => {
    return versions.filter(v=>ids.includes(v.id)).map(populateVersion)
}

const getEntityById = id => {
    return populateEntity(entities.find(e=>id===e.id))
}

const getEntitiesByIds = ids => {
    return entities.filter(e=>ids.includes(e.id)).map(populateEntity)
}

const populateEntity = entity => {
    return {
        ...entity,
        authors:getAuthorsByIds.bind(this,entity.authors || []),
        versions:getVersionsByIds.bind(this,entity.versions || []),
    }
}

const populateVersion = version => {
    return {
        ...version,
        entity:getEntityById.bind(this,version.entity || 1)
    }
}
const populateAuthor = author => {
    return {
        ...author,
        entities:getEntitiesByIds.bind(this,author.entities || [])
    }
}

module.exports = {
    populateAuthor,
    populateVersion,
    populateEntity
}