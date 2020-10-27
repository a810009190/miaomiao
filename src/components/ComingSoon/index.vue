<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-else ref="scroll">
            <ul>
                <li class="pullDown" style="margin: 0; padding: 0; border: none;">{{pullDownMsg}}</li>
                <li v-for="data in dataList" :key="data.filmId">
                    <div class="pic_show" @tap="handleToDetail(data.filmId)">
                        <img :src="data.poster" />
                    </div>
                    <div class="info_list">
                    <h2 @tap="handleToDetail(data.filmId)">{{data.name}}</h2>
                    <br>
                    <p>主演: {{data.actors | actorfilter}}</p>
                    <p>{{data.premiereAt | datafilter}}上映</p>
                    </div>
                    <div class="btn_pre">预售</div>
                </li>

            </ul>
        </Scroller>
    </div>
</template>

<script>

export default {
    name : 'ComingSoon',
    data() {
        return{
            dataList : [],
            pullDownMsg: '',
            isLoading: true
        }
    },
    filters:{
        // 将日期毫秒数转成日期格式
        datafilter(data){
            let d = new Date(data*1000);
            return d.toISOString().slice(0, 10);
        },
        actorfilter(data){
            let newList = data.map(item=>item.name);
            return newList.join(",");
        }
    },
    activated() {
        let id = this.$store.state.city.id
        this.axios({
            url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=2916388`,
            headers:{
                'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                'X-Host' : 'mall.film-ticket.film.list'
            }
        }).then(res=>{
                let msg = res.data.msg;
                if(msg === 'ok'){
                    // console.log(res.data);
                    this.isLoading = false;
                    this.dataList = res.data.data.films;
                    setTimeout(()=>{
                        this.$refs.scroll.scroll.refresh();
                    },500)
                }
        })
    },
    methods : {
        handleToDetail(Movieid){
            this.$router.push('/movie/detail/2/' + Movieid);
        },
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullDownMsg = "正在更新中"
                console.log(1111)
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30){
                let id = this.$store.state.city.id
                this.pullDownMsg = "更新完成"
                this.axios({
                    url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=2916388`,
                    headers:{
                        'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                        'X-Host' : 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    let msg = res.data.msg;
                    if(msg === 'ok'){
                        setTimeout(()=>{
                            this.dataList = res.data.data.films;
                            this.pullDownMsg = '';
                        }, 1000)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>