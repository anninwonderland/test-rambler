<template>
    <el-row>
        <el-col :offset="2" :span="20" class="">
            <Post/>
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
                currentPage: 1,
                pages: null,
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                const apiKey = {
                    key: '592415d6611422a407ddf84227d38375',
                };

                axios.get(`https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${apiKey.key}&content_type=1&format=json&nojsoncallback=1&page=${this.currentPage}`)
                    .then(response => {
                        const photosArr = response.data.photos.photo;
                        this.pages = response.data.photos.pages;

                        photosArr.forEach(item => {
                            const post = {};

                            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=${apiKey.key}&photo_id=${item.id}&format=json&nojsoncallback=1`)
                                .then((response) => {
                                    post.likes = response.data.photo.total;
                                });

                            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey.key}&photo_id=${item.id}&format=json&nojsoncallback=1`)
                                .then((response) => {
                                    post.username = response.data.photo.owner.username;
                                    post.location = response.data.photo.owner.location;
                                    post.date = new Date(Number(response.data.photo.dateuploaded)*1000).toLocaleDateString("en-US");
                                    post.title = response.data.photo.title._content;
                                    post.description = response.data.photo.description._content;

                                    post.avatar = (response.data.photo.owner.iconserver > 0) ?
                                        `http://farm${response.data.photo.owner.iconfarm}.staticflickr.com/${response.data.photo.owner.iconserver}/buddyicons/${response.data.photo.owner.nsid}.jpg`
                                        : 'https://www.flickr.com/images/buddyicon.gif'
                                });

                            post.image = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

                            this.data.push(post);
                        });
                        console.log(this.data)
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
