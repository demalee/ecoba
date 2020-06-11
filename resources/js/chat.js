/*
 *  Vue.js enabled chat app
 */
$(function(){
    const chat_app = new Vue({
        el: app_id,

        data: {
            active_user: {},
            users_list: [],
            messages_list: [],
            typed_message: "",
        },

        methods: {
            getRecentContants: function (event) {
                axios.get(get_contacts_url)
                .then((response) => {
                    this.users_list = response.data.contacts;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getUserMessages: function (event, user) {
                this.active_user = user;

                if (this.active_user) {
                    axios.get(get_messages_url +'/'+ this.active_user.id)
                    .then((response) => {
                        this.messages_list = response.data.messages;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
            sendMessage: function (event) {
                if (this.typed_message.trim() != '' && this.active_user.id) {
                    axios.post(send_message_url, {
                        message: this.typed_message,
                        receiver: this.active_user.id,
                    })
                    .then((response) => {
                        this.messages_list.push(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                    this.typed_message = '';
                }
            },
        },

        created: function () {
            this.getRecentContants();

            Echo.private(`instant-messaging.${laravel.user.id}`)
                .listen('.instant-messaging', (e) => {
                    console.log(this);

                    if (this.active_user.id == e.message.sender.id) {
                        this.messages_list.push(e.message);
                        this.getRecentContants();
                    }
                });
        },

        updated: function () {
            this.$nextTick(function () {
                console.log('Updated');
                scrollHistoryBottom();
            })
        },
    });

    function scrollHistoryBottom() {
        msg_history = document.getElementById('msg_history');
        msg_history.scrollTop = msg_history.scrollHeight;
    }
});
