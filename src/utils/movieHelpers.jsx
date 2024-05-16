// 영화 등급 반환
// export function getRating(adult) {
//     return adult ? '청소년 관람불가' : '전체 관람가';
// }

// 장르 이름 반환
// export function getGenresNames(genreId, genres) {
//     return genreId.map(id => genres[id]).join(", ");
// }

// export function getGenresNames(genreIds, genreMap) {
//     console.log(genreIds)
//     console.log(genreMap)
//     return genreIds.map(id => genreMap[id] ? genreMap[id] : 'Unknown').join(", ");
// }
export function getRating(adult) {
    if (adult === undefined) return 'Rating Unknown'; // Just in case
    return adult ? '청소년 관람불가' : '전체 관람가';
}

export function getGenresNames(genreIds, genreMap) {
    if (!genreMap || !genreIds) return 'Genres Unknown';
    return genreIds.map(id => genreMap[id] || 'Unknown').join(", ");
}
// export function getGenresNames(genreIds, genreMap) {
//     console.log('Genre IDs:', genreIds);
//     console.log('Genre Map:', genreMap);
//     return genreIds.map(id => genreMap[id] ? genreMap[id] : 'Unknown').join(", ");
// }