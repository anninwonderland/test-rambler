<template>
    <el-row>
        <el-col :offset="2" :span="8">
            <Post />
        </el-col>
    </el-row>
</template>

<script>
    import Post from "./Post/Post";
    export default {
        name: 'Feed',
        components: { Post }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
