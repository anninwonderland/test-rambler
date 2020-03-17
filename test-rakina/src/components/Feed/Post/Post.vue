<template>
    <el-row class="post-wrapper">
        <el-col>
            <div class="header">
                <img class="avatar" src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200" alt="?">
                <div class="header-info">
                    <span class="username">username</span>
                    <span class="location">location</span>
                </div>
                <span class="date">3h</span>
            </div>
            <div class="content">
                <img class="post-img" src="https://avatars.mds.yandex.net/get-pdb/985791/25a243bc-9b31-4e8d-a18e-8c16a2ff008b/s1200" alt="Posted photo">
                <div class="likes">
                    <button></button>
                    <span>12 000</span>
                </div>
                <p class="post-desc">
                    This is my awesome post
                </p>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Post'
    }
</script>

<style scoped>
    @import 'style.css';
</style>
