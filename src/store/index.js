import {
    createStore
} from 'vuex'
import mutationModel from './mutationType.js'
import { config } from '../../public/config/index'
const store = createStore({
    state: {
        tabCardData: []
    },
    getters: {
        [mutationModel.useTabData]: (state) => {
            return state.tabCardData
        },
        [mutationModel.GET_LASTTABPAGE]: (state) => {
            if (config.showTabBar) {
                let count = state.tabCardData.length
                if (count >= 1) {
                    return state.tabCardData[count - 1]
                } else {
                    return {
                        name: '首页',
                        path: '/layout/home'
                    }
                }
            }


        }
    },
    mutations: {
        [mutationModel.SET_TABPAGE](state, obj) {
            let item = state.tabCardData.find(x => x.name === obj.name)
            if (item === null || item === undefined)
                state.tabCardData.push(obj)
        },
        [mutationModel.REMOVE_TABPAGE](state, name) {
            console.log('关闭选项卡', state.tabCardData)
            let index = state.tabCardData.findIndex(m => m.name === name)
            state.tabCardData.splice(index, 1)
        }
    },
    actions: {
        [mutationModel.SET_TABPAGE]({
            commit
        }, objdata) {
            console.log('设置选项卡', objdata)
            commit(mutationModel.SET_TABPAGE, objdata)
        },
        [mutationModel.REMOVE_TABPAGE]({ commit }, objdata) {
            commit(mutationModel.REMOVE_TABPAGE, objdata)
        }
    },

})
export default store