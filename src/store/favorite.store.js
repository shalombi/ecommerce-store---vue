import { favoriteService } from '../services/favorite.service.local'

export function getActionRemoveFavorite(favoriteId) {
    return {
        type: 'removeFavorite',
        favoriteId
    }
}
export function getActionAddFavorite(favorite) {
    return {
        type: 'addFavorite',
        favorite
    }
}
export function getActionUpdateFavorite(favorite) {
    return {
        type: 'updateFavorite',
        favorite
    }
}

export function getActionAddFavoriteMsg(favoriteId) {
    return {
        type: 'addFavoriteMsg',
        favoriteId,
        txt: 'Stam txt'
    }
}

export const favoriteStore = {
    state: {
        favorites: [],
        filterBy: {
            vendor: '',
        }
    },
    getters: {
        favorites({ favorites }) {
            console.log('favorites from store:', favorites)
            return favorites
        },
    },
    mutations: {
        setFavorites(state, { favorites }) {
            state.favorites = favorites
        },
        setFavoriteFilterBy(state, { vendor }) {
            state.filterBy.vendor = vendor

        },
        addFavorite(state, { favorite }) {
            state.favorites.push(favorite)
        },
        updateFavorite(state, { favorite }) {
            const idx = state.favorites.findIndex(p => p._id === favorite._id)
            state.favorites.splice(idx, 1, favorite)
        },
        removeFavorite(state, { favoriteId }) {
            state.favorites = state.favorites.filter(favorite => favorite._id !== favoriteId)
        },
        addFavoriteMsg(state, { favoriteId, msg }) {
            const favorite = state.favorites.find(favorite => favorite._id === favoriteId)
            if (!favorite.msgs) favorite.msgs = []
            favorite.msgs.push(msg)
        },
    },
    actions: {
        async addFavorite(context, { favorite }) {
            try {

                console.log('favorite from service:', favorite)
                // return
                // const favoriteToSave = { ...favorite, id: '' }
                const favoriteToSave = await favoriteService.save({ ...favorite, isInFavorites: favorite.isInFavorites })

                console.log(favorite)
                // return


                context.commit(getActionAddFavorite(favoriteToSave))
                return favoriteToSave
            } catch (err) {
                console.log('favoriteStore: Error in addFavorite', err)
                throw err
            }
        },
        async updateFavorite(context, { favorite }) {
            try {
                favorite = await favoriteService.save(favorite)
                context.commit(getActionUpdateFavorite(favorite))
                return favorite
            } catch (err) {
                console.log('favoriteStore: Error in updateFavorite', err)
                throw err
            }
        },
        async loadFavorites(context) {
            try {
                // console.log('context:', context.state.filterBy)
                const { filterBy } = context.state
                const favorites = await favoriteService.query(filterBy)
                context.commit({ type: 'setFavorites', favorites })
            }
            catch (err) {
                console.log('favoriteStore: Error in loadFavorites', err)
                throw err
            }
        },
        async removeFavorite(context, { favoriteId }) {
            try {
                await favoriteService.remove(favoriteId)
                context.commit(getActionRemoveFavorite(favoriteId))
            } catch (err) {
                console.log('favoriteStore: Error in removeFavorite', err)
                throw err
            }
        },
        async addFavoriteMsg(context, { favoriteId, txt }) {
            try {
                const msg = await favoriteService.addFavoriteMsg(favoriteId, txt)
                context.commit({ type: 'addFavoriteMsg', favoriteId, msg })
            } catch (err) {
                console.log('favoriteStore: Error in addFavoriteMsg', err)
                throw err
            }
        },
        async setFavoriteFilterBy(context, { vendor }) {
            try {
                // const msg = await favoriteService.addFavoriteMsg(favoriteId, txt)
                context.commit({ type: 'setFavoriteFilterBy', vendor })
            }
            catch (err) {
                console.log('favoriteStore: Error in setFavoriteFilterBy', err)
                throw err
            }
        },

    }
}