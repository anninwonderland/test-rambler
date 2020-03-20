<template>
    <div class="post-wrapper">
        <img class="post-img-sm hidden-sm-and-up"
             src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200"
             alt="Posted photo">

        <div class="post-text">
            <div class="header">
                <img class="avatar"
                     src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200"
                     alt="?">
                <div class="header-info">
                    <span class="username">username</span>
                    <span class="location">location</span>
                </div>
                <span class="date">3h</span>
            </div>
            <hr class="divider hidden-sm-and-up">
            <div class="content">
                <img class="post-img hidden-xs-only" src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200" alt="Posted photo">
                <div class="like">
                    <div class="like-btn"></div>
                    <span>12 000</span>
                </div>
                <p class="post-desc">
                    This is my awesome post This is my awesome post This is my awesome post This is my awesome post
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Post'
    }
</script>

<style scoped>
    @import 'style.css';
</style>
