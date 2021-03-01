import {
    createStore
} from 'vuex'
import mutationModel from './mutationType.js'
const store = createStore({
    state: {
        tabCardData: []
    },
    getters: {
        [mutationModel.useTabData]: (state) => {
            return state.tabCardData
        }
    },
    mutations: {
        [mutationModel.SET_TABPAGE](state, obj) {
            console.log('准备查询选项卡', obj)
            let item = state.tabCardData.find(x => x.name === obj.name)
            console.log('选模型卡是', item)
            if (item === null || item === undefined)
                state.tabCardData.push(obj)
        }
    },
    actions: {
        [mutationModel.SET_TABPAGE]({
            commit
        }, objdata) {
            console.log('设置选项卡', objdata)
            commit(mutationModel.SET_TABPAGE, objdata)
        }
    },

})
export default store