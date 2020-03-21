<template>
    <el-row v-if="data.length" v-loading.fullscreen.lock="loadingData">
        <el-col :span="22" :offset="1" >
            <div class="wrapper">
                <Post v-for="item in data" :key="item.imageId" :item="item"/>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import Post from "./Post/Post";
    import axios from 'axios';

    export default {
        name: 'Feed',
        components: { Post },
        data() {
            return {
                data: [],
                loadingData: true,

                currentPage: 1,
                pages: null,
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                const values = {
                    key: '592415d6611422a407ddf84227d38375',
                    perPage: 10
                };

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
                                    post.likes = favResponse.data.photo.total;

                                    post.username = infoResponse.data.photo.owner.username;
                                    post.location = infoResponse.data.photo.owner.location;
                                    post.date = new Date(Number(infoResponse.data.photo.dateuploaded) * 1000).toLocaleDateString("en-US");
                                    post.title = infoResponse.data.photo.title._content;
                                    post.description = infoResponse.data.photo.description._content;
                                    post.avatar = (infoResponse.data.photo.owner.iconserver > 0) ?
                                        `http://farm${infoResponse.data.photo.owner.iconfarm}.staticflickr.com/${infoResponse.data.photo.owner.iconserver}/buddyicons/${infoResponse.data.photo.owner.nsid}.jpg`
                                        : 'https://www.flickr.com/images/buddyicon.gif';

                                    post.imageId = item.id;
                                    post.image = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

                                    this.data.push(post);
                                    this.loadingData = false;
                                }))
                                .catch((err) => {
                                    console.log(err);

                                    this.loadingData = false;
                                })
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.loadingData = false;
                    });

            }
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
