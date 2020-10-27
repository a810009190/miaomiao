const state = {
    nm: localStorage.getItem('nowNm') || '上海',
    id: localStorage.getItem('nowId') || '310100',
};

const actions = {

};

const mutations = {
    CITY_INFO(state , data){
        state.nm = data.nm;
        state.id = data.id;
    }
};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}