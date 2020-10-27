<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <!-- <ul>
            <li>
                <div class="pic_show"><img src="./images/movie_1.jpg"></div>
                <div class="info_list">
                <h2>无名之辈</h2>
                <p>观众评 <span class="grade">9.2</span></p>
                <p>主演: 陈建斌,任素汐,潘斌龙</p>
                <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            
        </ul> -->
        <!-- 将函数作为值传给scroller组件，由该组件调用方法 -->
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-else>
            <ul>
                <li class="pulldown" style="margin: 0; padding: 0; border: none;">{{pullDownMsg}}</li>
                <li v-for="data in dataList" :key="data.filmId" >
                    <div class="pic_show" @tap="handleToDetail(data.filmId)">
                    <img :src="data.poster" />
                    </div>
                    <div class="info_list">
                    <h2 @tap="handleToDetail(data.filmId)">{{data.name}}</h2>
                    <br>
                    <p>主演: {{data.actors | actorfilter}}</p>
                    <p>{{data.nation}} | {{data.item.name}}</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            
            </ul>
        </Scroller>
    </div>

</template>

<script>

// import BScroll from 'better-scroll'
// 将演员数组转成逗号分隔的字符串
export default {
    name : 'NowPlaying',
    data() {
        return{
            dataList: [],
            // 鼠标上拉的提示信息
            pullDownMsg: '',
            isLoading: true
        }
    },
    filters:{
        actorfilter(data){
            let newList = data.map(item=>item.name);
            return newList.join(",");
        }
    },
    // scroll每个组件都要引入太麻烦，也不美观，最好的办法是将scroll封装成一个组件
    activated(){
        let id = this.$store.state.city.id
        this.axios({
            url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=7043687`,
            headers:{
                'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                'X-Host' : 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            let msg = res.data.msg;
            if(msg === 'ok'){
                // console.log(res.data);
                // 将获取到的信息存入dataList
                this.isLoading = false;
                this.dataList = res.data.data.films;
                
            }
            // 保证上一步操作执行完毕后再执行下面的代码
            // this.$nextTick(()=>{
            //     // 参数1-最外层容器 参数2-配置对象
            //     // 使用Better-scroll的前提条件里面的内容比外面的容器长
            //     var scroll = new BScroll(this.$refs.movie_body, {
            //         tap : true,
            //         probeType: 1
            //     });

            //     // pos检测当前位置，拖拽距离
            //     scroll.on("scroll", (pos)=>{
            //         if(pos.y > 30){
            //             this.pullDownMsg = "正在更新中";
            //         }

            //     });
            //     scroll.on("touchEnd", (pos)=>{
                    // if(pos.y > 30){
                    //     this.pullDownMsg = "更新完成";
                    //     this.axios({
                    //         url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=7043687`,
                    //         headers:{
                    //             'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                    //             'X-Host' : 'mall.film-ticket.film.list'
                    //         }
                    //     }).then(res=>{
                    //         var msg = res.data.msg;
                    //         if(msg === 'ok'){
                    //             // console.log(res.data);
                    //             // 将获取到的信息存入dataList
                    //             setTimeout(()=>{
                    //                 this.dataList = res.data.data.films;
                    //                 this.pullDownMsg = '';
                    //             }, 1000);
                    //         }
                    //     })
                    // }
            //     });
            // })
        })
    },
    methods : {
        handleToDetail(movieId){
            // console.log(movieId);
            this.$router.push('/movie/detail/1/' + movieId);
        },
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullDownMsg = "正在更新中";
            }
        },
        handleToTouchEnd(pos){
            let id = this.$store.state.city.id
            if(pos.y > 30){
                this.pullDownMsg = "更新完成";
                this.axios({
                    url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=7043687`,
                    headers:{
                        'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                        'X-Host' : 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    let msg = res.data.msg;
                    if(msg === 'ok'){
                        // console.log(res.data);
                        // 将获取到的信息存入dataList
                        setTimeout(()=>{
                            this.dataList = res.data.data.films;
                            this.pullDownMsg = '';
                        }, 1000);
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
.movie_body .pullDown{ margin:0; padding:0; border:none;}

</style>