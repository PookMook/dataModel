const entities = {
  1:{
    id:1,
    name:"test",
    authors:[1,2],
    versions:[1,2]
  },
  2:{
    id:2,
    name:"2nd",
    authors:[1],
    versions:[3]
  }
}

const authors = {
  1:{
    id:1,
    name:"Super Author",
    entities:[entities[1],entities[2]]
  },
  2:{
    id:2,
    name:"Not so good author",
    entities:[entities[1]],
  }
}

const versions = {
  1:{
    id:1,
    text:"Mon texte",
    entity:entities[1]
  },
  2:{
    id:2,
    text:"My text",
    entity:entities[1]
  },
  3:{
    id:3,
    text:"Hello here",
    entity:entities[2]
  }
}

for(const id in entities){
  const entity = entities[id]
  entity.versions = entity.versions.map(v=>versions[v])
  entity.authors = entity.authors.map(v=>authors[v])
}


module.exports = {
  entities,
  authors,
  versions,
}