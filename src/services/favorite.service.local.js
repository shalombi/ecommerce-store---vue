
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'favorite'

export const favoriteService = {
    query,
    getById,
    save,
    remove,
    // getEmptyFavorite,
    addFavoriteMsg
}
window.cs = favoriteService


async function query(filterBy = { vendor: '',minPrice:'' }) {
    var favorites = await storageService.query(STORAGE_KEY)

    if (filterBy.vendor) {
        const regex = new RegExp(filterBy.vendor, 'i')
        favorites = favorites.filter(favorite => regex.test(favorite.vendor) || regex.test(favorite.description))
    }


    console.log('favorites:', favorites)

    return favorites
}

function getById(favoriteId) {
    return storageService.get(STORAGE_KEY, favoriteId)
}

async function remove(favoriteId) {
    await storageService.remove(STORAGE_KEY, favoriteId)
}

async function save(favorite) {
    const favoriteId = favorite._id

    let allFavorites = await query()
    let currFavorite = allFavorites.filter(f => f._id === favoriteId)
    if (currFavorite.length >= 1) return

    const savedFavorite = await storageService.post(STORAGE_KEY, favorite, true)
    return savedFavorite

    // var savedFavorite
    // if (favorite._id ) {
    //     savedFavorite = await storageService.put(STORAGE_KEY, favorite)
    // } else {
    //     // Later, owner is set by the backend
    //     favorite.owner = userService.getLoggedinUser()
    //     savedFavorite = await storageService.post(STORAGE_KEY, favorite)
    // }
    // return savedFavorite
}

async function addFavoriteMsg(favoriteId, txt) {
    // Later, this is all done by the backend
    const favorite = await getById(favoriteId)
    if (!favorite.msgs) favorite.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    favorite.msgs.push(msg)
    await storageService.put(STORAGE_KEY, favorite)

    return msg
}

// function getEmptyFavorite() {
//     return {
//         ...defaultPrd
//     }
// }



// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { ...prd1})
//     await storageService.post(STORAGE_KEY, { ...prd2})
//     await storageService.post(STORAGE_KEY, { ...prd3})
//     await storageService.post(STORAGE_KEY, { ...prd4})
// })()


