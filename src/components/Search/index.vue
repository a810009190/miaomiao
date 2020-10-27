<template>
    <div class="search_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else ref="scroll">
            <div>
                <div class="search_input">
                    <div class="search_input_wrapper">
                        <i class="iconfont icon-sousuo"></i>
                        <input type="text" v-model="message">
                    </div>					
                </div>
                <div class="search_result">
                    <h3>电影/电视剧/综艺</h3>
                    <ul>
                        <li v-for="item in moviesList" :key="item.filmId">
                            <div class="img" @tap="handleToDetail(item.filmId)"><img :src=" item.poster"></div>
                            <div class="info">
                                <p><span>{{ item.name }}</span><span>{{ item.sc }}</span></p>
                                <br>
                                <p>{{ item.category }}</p>
                                <p>{{ item.premiereAt | datafilter }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroller>
    </div>
</template>

<script>
export default {
    data(){
        return{
            moviesList: [],
            dataList: [],
            message: '',
            isLoading: true

        }
    },
    watch: {
        message(newVal){
            let newList = [];
            for(let i = 0; i < this.dataList.length; i++){
                if(this.dataList[i].name.indexOf(newVal) > -1){
                    newList.push(this.dataList[i]);
                }
                
            }
            this.moviesList = newList;
            
            // console.log(this.moviesList);
        }
    },
    filters:{
        datafilter(data){
            let d = new Date(data*1000);
            return d.toISOString().slice(0, 10);
        }
    },
    activated(){
        this.axios({
            url: `https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=7043687`,
            headers:{
                'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                'X-Host' : 'mall.film-ticket.film.list'
            }
        }).then((res)=>{
            if(res.data.msg === 'ok'){
                // console.log(res.data.data);
                this.dataList = res.data.data.films;
                this.isLoading = false;
                // console.log(this.newArr);
            }
        })
    },
    methods: {
        handleToDetail(movieId){
            this.$router.push('/movie/detail/3/' + movieId);
        },
        reScroll(){
            console.log(this.$refs.scroll);
            // this.$refs.scroll.this.scroll.refresh();
        }
    }
}
    





</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>