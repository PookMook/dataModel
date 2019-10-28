const entities = [
  {
    id:1,
    name:"test",
    authors:[1,2],
    versions:[1,2]
  },
  {
    id:2,
    name:"2nd",
    authors:[1],
    versions:[3]
  }
]

const authors = [
  {
    id:1,
    name:"Super Author",
    entities:[1,2]
  },
  {
    id:2,
    name:"Not so good author",
    entities:[1],
  }
]

const versions = [
  {
    id:1,
    text:"Mon texte",
    entity:1
  },
  {
    id:2,
    text:"My text",
    entity:1
  },
  {
    id:3,
    text:"Hello here",
    entity:2
  }
]

entities.forEach(entity => {
  entity.versions = entity.versions.map(v=>versions.find(ov=>ov.id===v))
  entity.authors = entity.authors.map(a=>authors.find(oa=>oa.id===a))
})

versions.forEach(version => {
  version.entity = entities.find(e=>e.id===version.entity)
})

authors.forEach(author => {
  author.entities = author.entities.map(e=>entities.find(oe=>oe.id===e))
})

module.exports = {
  entities,
  authors,
  versions,
}