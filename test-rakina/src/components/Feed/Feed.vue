<template>
    <el-row>
        <el-col :offset="2" :span="8">
            <PostSm/>
        </el-col>
        <el-col :offset="1" :span="6">
            <PostLg/>
        </el-col>
        <el-col :offset="1" :span="6">
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

    export default {
        name: 'Feed',
        components: { PostSm, PostLg },
    }
</script>

<style scoped>
    @import 'style.css';
</style>
