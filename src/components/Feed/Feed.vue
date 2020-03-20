<template>
    <el-row>
        <el-col :offset="2" :span="20" class="hidden-md-and-up">
            <PostSm/>
        </el-col>
        <el-col :offset="2" :span="20" class="hidden-md-and-up">
            <PostSm/>
        </el-col>
        <el-col :offset="2" :span="20" class="hidden-md-and-up">
            <PostSm/>
        </el-col>

        <el-col :offset="2" :span="6" class="hidden-sm-and-down">
            <PostLg/>
        </el-col>
        <el-col :offset="1" :span="6" class="hidden-sm-and-down">
            <PostLg/>
        </el-col>
        <el-col :offset="1" :span="6" class="hidden-sm-and-down">
            <PostLg/>
        </el-col>
        <!--        <el-col :offset="1" :span="6">-->
        <!--            <PostSm/>-->
        <!--        </el-col>-->

    </el-row>
</template>

<script>
    import PostSm from "./Post/PostSm";
    import PostLg from "./Post/PostLg";
    import axios from 'axios';

    export default {
        name: 'Feed',
        components: { PostSm, PostLg },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                const apiKey = {
                    key: '592415d6611422a407ddf84227d38375',
                    userId: 'cedarsphoto'
                };
                axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey.key}&user_id=${apiKey.userId}&format=json&nojsoncallback=1`)
                    .then(response => {
                       //do some crash defend
                        console.log(response.data)
                        if (!response.data.photos.photo.length) return;
                        let array = response.data.photos.photo;
                        array.forEach(item => {
                            axios.get(`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
                                .then((response) => {
                                    console.log(response.config.url);
                                });
                            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=${apiKey.key}&photo_id=${item.id}&format=json&nojsoncallback=1`)
                                .then((response) => {
                                console.log(response.data.photo.total);
                            })
                            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey.key}&photo_id=${item.id}&format=json&nojsoncallback=1`)
                                .then((response) => {
                                    console.log(response.data.photo.dateuploaded, new Date(Number(response.data.photo.dateuploaded)*1000).toLocaleDateString("en-US"));
                                    console.log(response.data.photo.owner.username);
                                    console.log(response.data.photo.title._content);
                                    console.log(response.data.photo.description._content);
                                    console.log(response.data.photo.owner.location);
                                });
                        })
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
