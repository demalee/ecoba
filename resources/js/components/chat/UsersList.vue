<template>
    <div class="chat_list " v-bind:class="activeClass">
        <div class="chat_people" v-on:click="viewMessages">
            <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="avator"> </div>
            <div class="chat_ib">
                <h5>{{ user.name }} <span class="chat_date">{{ user.last_message_date }}</span></h5>
                <p>{{ user.last_message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:[
            'user',
            'active_user',
            'on_click',
        ],

        methods: {
            viewMessages: function (event) {
                this.on_click(event, {
                    id: this.user.id,
                    name: this.user.name,
                });
            },
        },

        computed: {
            activeClass: function () {
                return {
                    active_chat: this.active_user.id === this.user.id
                }
            }
        },
    }
</script>
