<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Loading v-if="isLoading"/>
        <Scroller v-else>
            <Header title="影片详情">
                <i class="iconfont icon-right" @tap="handleToBack"></i>
            </Header>
            <div id="content" class="contentDetail">
                <div class="detail_list">
                    <div class="detail_list_bg" :style =" { 'background-image' : 'url(' + filmObj.poster +')'}"></div>
                    <div class="detail_list_filter"></div>
                    <div class="detail_list_content">
                        <div class="detail_list_img">
                            <img :src="filmObj.poster" alt="">
                        </div>
                        <div class="detail_list_info">
                            <h2>{{filmObj.name}}</h2>
                            <br>
                            <p>{{filmObj.grade}}</p>
                            <p>{{filmObj.category}}</p>
                            <p>{{filmObj.nation}} / {{filmObj.runtime}}分钟</p>
                            <p>{{filmObj.premiereAt | datafilter}}大陆上映</p>
                        </div>
                    </div>
                </div>
                <div class="detail_intro">
                    <p>{{filmObj.synopsis}}</p>
                </div>
                <div class="detail_player swiper-container" ref="detail_player">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="(item, index) in filmObj.actors" :key="index">
                            <div>
                                <img :src="item.avatarAddress" alt="">
                            </div>
                            <p>{{item.name}}</p>
                            <p>{{item.role}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroller>
	</div>
</template>

<script>
import Header from '@/components/Header';

export default {
    components:{
        Header
    },
    data(){
        return{
            filmObj: {},
            isLoading: true
        }
    },
    // 通过props获取url传来的参数，在路由中先开启props
    props: ['movieId'],
    mounted(){
        // console.log(this.movieId);
        // let movieId = this.$route.params.movieId;
        this.axios({
            url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=2098005`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160342699566052302045186","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then((res) => {
            // console.log(res.data.data.film);
            this.filmObj = res.data.data.film;
            this.isLoading = false;
            this.$nextTick(()=>{
                let swiper = new Swiper(this.$refs.detail_player, {
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeSticky: true
                })
            })
        })
    },
    methods:{
        handleToBack(){
            // 路由回退
            this.$router.back();
        }
    },
    filters:{
        // 日期过滤器
        datafilter(data){
            let d = new Date(data*1000);
            return d.toISOString().slice(0, 10);
        }
    }
}
</script>

<style scoped>
	#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
	#detailContrainer.slide-enter-active{ animation: .5s slideMove; }
    /* 过渡动画 */
    @keyframes slideMove{
        0%{ transform: translateX(100%); }
        100%{ transform: translateX(0);}
    }


	#content.contentDetail{ display: block; margin-bottom:0;}
	#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
	.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
	.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
	.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
	.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
	.detail_list .detail_list_img img{ width:100%; height: 100%;}
	.detail_list .detail_list_info{ margin-top: 20px;}
	.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
	.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
	#content .detail_intro{ padding: 10px;}
	#content .detail_player{ margin:20px;}
	.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
	.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
	.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
	</style>