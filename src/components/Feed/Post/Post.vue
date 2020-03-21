<template>
    <div class="post-wrapper" v-if="item">
        <img class="post-img-sm hidden-sm-and-up"
             :src="item.image"
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
                <div class="like">
                    <div class="like-btn" @click="likePhoto">
                        <img v-if="isLiked" src="../../../assets/images/filled_like.png" alt="like">
                        <img v-else src="../../../assets/images/empty_like.png" alt="unlike">
                    </div>
                    <span v-if="item.likes">{{item.likes}}</span>
                </div>
                <p class="post-title" v-if="item.title">
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
        data() {
            return {
                isLiked: false
            }
        },
        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        created() {
            this.item.likes = Number(this.item.likes);
        },
        methods: {
            likePhoto() {
                this.isLiked = !this.isLiked;
                this.isLiked ? this.item.likes += 1 : this.item.likes -= 1;

                this.$notify({
                    title: `${this.isLiked ? 'Like!👍' : 'Unlike!👎'}`,
                    type: `${this.isLiked ? 'success' : 'warning'}`,
                    message: `Photo id is ${this.item.imageId}`
                });
            }
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>
