<template>
    
    <div class="city_body">
            <Loading v-if="isLoading"/>
            <div class="city_list" v-else>
                <Scroller ref="city_list">
                    <div>
                        <div class="city_hot">
                            <h2>热门城市</h2>
                            <ul class="clearfix">
                                <li v-for="data in hotList" :key="data.cityId" @tap="handleCity(data.name, data.cityId)">{{data.name}}</li>
                            </ul>
                        </div>
                        <div class="city_sort" ref="city_sort">
                            <div v-for="data in cityList" :key="data.index">
                                <h2>{{data.index}}</h2>
                                <ul>
                                    <li v-for="item in data.list" :key="item.id" @tap="handleCity(item.nm, item.id)">{{item.nm}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Scroller>
            </div>

        <div class="city_index">
            <ul>
                <li @click="handleIndex(num)" v-for="(data,num) in cityList" :key="data.index">{{data.index}}</li>
            </ul>
        </div>
    </div>  
     
</template>

<script>
export default {
    name: 'City',
    data(){
        return{
            cityList : [],
            hotList : [],
            isLoading: true

        }

    },
    activated() {
        // 定义两个变量接收localStorage中的cityList和hotList
        let cityList = localStorage.getItem("cityList");
        let hotList = localStorage.getItem("hotList");
        // 如果有这两个数据说明之前已经缓存了，直接调用
        if(cityList && hotList){
            // 将存储在localStorage中的数据解析并赋值给data中的cityList和hotList
            this.cityList =JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }
        // 没有这两个数据就重发请求
        else{
            this.axios({
                url: "https://m.maizuo.com/gateway?k=7027877",
                headers: {
                    'X-Client-Info' : '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602843160199217763057665","bc":"310100"}',
                    'X-Host' : 'mall.film-ticket.city.list'
                }
            }).then(res=>{
                let resList = res.data.data.cities;
                // 用modifyRes方法对城市数组进行处理，拆分出热门城市和普通城市
                this.modifyRes(resList);
                this.isLoading = false;
                setTimeout(()=>{
                    this.$refs.city_list.scroll.refresh();
                }, 500);
            })
        }

    },
    methods : {
        modifyRes(arr){
            
            let cityList1 = [];
            let hotList1 =[]
            // 将热门城市循环push进hotList
            arr.forEach(item=>{
                if(item.isHot === 1){
                    hotList1.push(item);
                    this.hotList = hotList1;
                    localStorage.setItem("hotList", JSON.stringify(hotList1))
                }
            });
            // 在letterArr中放入26个大写字母
            // let letterArr = [];
            // for(let i = 65; i < 91; i++){
            //     letterArr.push(String.fromCharCode(i));
            // }

            for(let j = 0; j < arr.length; j++){
                let firstLetter = arr[j].pinyin.substring(0, 1).toUpperCase();
                if(toCom(firstLetter)){
                    cityList1.push({
                        index: firstLetter,
                        list: [
                            {
                                nm: arr[j].name,
                                id: arr[j].cityId
                            }
                        ]
                    })
                } else{
                    for(let k = 0; k < cityList1.length; k++){
                        if(cityList1[k].index === firstLetter){
                            cityList1[k].list.push({
                                nm: arr[j].name,
                                id: arr[j].cityId
                            })
                        }
                    }
                }
            }
            cityList1.sort((n1, n2)=>{
                if(n1.index > n2.index){
                    return 1;
                }else if(n1.index < n2.index){
                    return -1
                }else{
                    return 0
                }
            });
            // console.log(cityList1);
            localStorage.setItem("cityList", JSON.stringify(cityList1));
            this.cityList = cityList1;

            function toCom(firstLetter){
                for(let d = 0; d < cityList1.length; d++){
                    if(cityList1[d].index === firstLetter){

                        return false;
                    }
                    // else{
                    //     return true;为什么这里return true不行
                    // }
                }
                return true;
            }
            
        },
        handleIndex(num){
            let h2 = this.$refs.city_sort.getElementsByTagName("h2");
            // 引入better-scroll以后原生的方法用不了了，可以用better-scroll带的方法scrollTo
            this.$refs.city_list.toScrollTop(-h2[num].offsetTop);
            // console.log(12);


        },
        // 修改state中的city下的nm和id
        handleCity(nm, id){
            this.$store.commit('city/CITY_INFO', { nm , id });
            localStorage.setItem("nowNm", nm);
            localStorage.setItem("nowId", id);
            this.$router.push('/movie/nowPlaying');

        }

    }
}
</script>

<style>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-bottom: 160px;margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>