<template>
    <div>
        <el-row v-if="data.length" v-loading.fullscreen.lock="loadingData">
            <el-col :span="22" :offset="1">
                <div class="wrapper">
                    <Post v-for="item in data" :key="item.imageId" :item="item"/>
                </div>
            </el-col>
        </el-row>
        <div v-loading="loadingMore" style="margin: 50px 0"></div>
        <el-backtop target=""></el-backtop>
    </div>

</template>

<script>
    import Post from "./Post/Post";
    import axios from 'axios';

    const _ = require("lodash");
    const moment = require('moment');

    export default {
        name: 'Feed',
        components: { Post },
        data() {
            return {
                data: [],
                loadingData: true,
                loadingMore: false,

                currentPage: 0,
                pages: null,
            }
        },
        created() {
            this.fetchData()
        },
        mounted() {
            window.addEventListener('scroll', _.throttle(this.onScroll, 1000))
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll)
        },

        methods: {
            fetchData() {
                const values = {
                    key: '592415d6611422a407ddf84227d38375',
                    perPage: 10
                };
                this.currentPage += 1;

                axios.get(`https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${values.key}&content_type=1&format=json&nojsoncallback=1&page=${this.currentPage}&per_page=${values.perPage}`)
                    .then(response => {

                        this.pages = response.data.photos.pages;
                        const photosArr = response.data.photos.photo;

                        photosArr.forEach(item => {
                            const post = {};

                            axios.all([
                                axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=${values.key}&photo_id=${item.id}&format=json&nojsoncallback=1`),
                                axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${values.key}&photo_id=${item.id}&format=json&nojsoncallback=1`)
                            ])
                                .then(axios.spread((favResponse, infoResponse) => {
                                    const source = infoResponse.data.photo;

                                    post.username = source.owner.username;
                                    post.location = source.owner.location;
                                    post.date = moment.unix(source.dateuploaded).fromNow();
                                    post.likes = favResponse.data.photo.total;
                                    post.title = source.title._content;
                                    post.description = source.description._content;
                                    post.imageId = source.id;

                                    post.image = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
                                    post.avatar = (Number(source.owner.iconserver) > 0)
                                        ? `http://farm${source.owner.iconfarm}.staticflickr.com/${source.owner.iconserver}/buddyicons/${source.owner.nsid}.jpg`
                                        : 'https://www.flickr.com/images/buddyicon.gif';



                                    this.loadingData = false;
                                    this.loadingMore = false;

                                    /* flickr.interestingness.getList method are reactive
                                     and can give the same object on different pages
                                     depending on current interestingness
                                     */
                                    if (this.data.some(elem => elem.imageId === post.imageId)) return;

                                    this.data.push(post);

                                }))
                                .catch((err) => {
                                    console.log(err);

                                    this.$message.error('Something went wrong! 🤷');
                                    this.loadingData = false;
                                    this.loadingMore = false;
                                })
                        });
                    })
                    .catch((err) => {
                        console.log(err);

                        this.$message.error('Something went wrong! 🤷');
                        this.loadingData = false;
                    });
            },

            onScroll() {
                this.loadingMore = true;

                    if (this.currentPage >= this.pages) {
                        window.removeEventListener('scroll', this.onScroll);
                        this.loadingMore = false;
                    } else if ((window.pageYOffset + window.document.documentElement.clientHeight) >= window.document.body.scrollHeight) {
                        this.fetchData();
                    }
            },
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
