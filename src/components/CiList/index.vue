<template>
	<div class="cinema_body">
        <Loading v-if="isLoading"/>
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-else ref="scroll">
            <ul>
                <li style="margin: 0; padding: 0; border: none">{{pullDownMsg}}</li>
                <li v-for="data in cinemaList" :key="data.cinemaId">
                    <div>
                        <span>{{data.name}}</span>
                        <span class="q"><span class="price">{{data.lowPrice / 100}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{data.address}}</span>
                        <span>{{data.Distance.toFixed(2)}}km</span>
                    </div>
                    <div class="card">
                        <div>小吃</div>
                        <div>折扣卡</div>
                    </div>
                </li>
            </ul>
        </Scroller>
	</div>

</template>

<script>
export default {
    name: "CiList",
    data(){
        return{
            cinemaList: [],
            isLoading: true,
            pullDownMsg: '',
            preCityId: -1
        }
    },
    activated(){
        let id = this.$store.state.city.id;
        if(this.preCityId != id){
            this.axios({
                url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=1358505`,
                headers: {
                    'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                    'X-Host' : 'mall.film-ticket.cinema.list'
                }
            }).then(res=>{
                this.isLoading = false;
                this.cinemaList = res.data.data.cinemas
                this.preCityId = id;
                // 每次进入刷新一下refresh，主要是由于移动端小键盘会导致betterScroll滚动失效
                setTimeout(()=>{
                    this.$refs.scroll.scroll.refresh();
                }, 400);
            })
        }

    },
    methods:{
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullDownMsg = "正在更新中"
                // console.log(1111)
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30){
                let id = this.$store.state.city.id;
                this.pullDownMsg = "更新完成"
                this.axios({
                    url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=1358505`,
                    headers:{
                        'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                        'X-Host' : 'mall.film-ticket.cinema.list'
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
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>