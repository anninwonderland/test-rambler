<template>
    <div class="post-wrapper" v-if="item">
        <img class="post-img-sm hidden-sm-and-up"
             src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200"
             alt="Posted photo">

        <div class="post-text">
            <div class="header">
                <img class="avatar"
                     :src="item.avatar"
                     alt="?">
                <div class="header-info">
                    <span class="username" v-if="item.username">{{item.username}}</span>
                    <span class="location" v-if="item.location">{{item.location}}</span>
                </div>
                <span class="date" v-if="item.date">{{item.date}}</span>
            </div>
            <hr class="divider hidden-sm-and-up">
            <div class="content">
                <img class="post-img hidden-xs-only"
                     :src="item.image"
                     alt="Posted photo">
                <div class="like" v-if="item.likes">
                    <div class="like-btn"></div>
                    <span>{{item.likes}}</span>
                </div>
                <p class="post-desc" v-if="item.title">
                    {{item.title}}
                </p>
                <p class="post-desc" v-if="item.description">
                    {{item.description}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Post',
        props: {
            item: {
                type: Object,
                default: () => {return {}}
            }
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
