

const models = {
    '1': '001 Bulbasaur-1.gltf',
    '2': '002 Ivysaur-1.gltf',
    '6': '006 Charizard-1.gltf',
    '14': 'kakuna.gltf'
}

export function has3DModel(id){
    return id in models
}

export function getModelPath(id){
    return '/SEP4ExercisesAndHandins/pokemon-3d-models/' + models[id];
}