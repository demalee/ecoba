<template>
    <div class="incoming_msg" v-if="incoming">
        <div class="incoming_msg_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
        </div>

        <div class="received_msg">
            <div class="received_withd_msg">
                <p>{{ message.text }}</p>
                <span class="time_date"> {{ message.created_at }}</span>
            </div>
        </div>
    </div>

    <div class="outgoing_msg" v-else>
        <div class="sent_msg">
            <p>{{ message.text }}</p>
            <span class="time_date"> {{ message.created_at }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message'],

        computed: {
            incoming: function () {
                return laravel.user.id == this.message.receiver.id
            },
        },
    }
</script>
