// // Listener for Event Broadcasts
// Echo.private(`instant-messaging.{{ Auth::user()->id }}`)
//     .listen('.instant-messaging', (e) => {
//         console.log(e, 'Showing Message ...!');
//         display_message(e.message, e.user.name);
//     });
//
// // Send Message Broadcasts
// var msg_form = document.getElementById("msg_form");
//
// msg_form.addEventListener("submit", function(e) {
//     e.preventDefault();
//
//     // get form data
//     var message_txt = document.getElementById("messageTextArea").value;
//     var message_receiver = document.getElementById("receiverSelect").value;
//
//     // post form data
//     axios.post("{{ route('messages.store') }}", {
//         message: message_txt,
//         receiver: message_receiver,
//     })
//     .then(function (response) {
//         console.log(response);
//         display_message(message_txt, "{{ Auth::user()->name }}")
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// });
//
// // Display Message
// function display_message(message_txt, user_name) {
//     var display = document.getElementById("display-message");
//     var message_p = document.createElement("p");
//     var message_text = document.createTextNode(
//         user_name + ": " + message_txt
//     );
//
//     // insert text and append to message display
//     message_p.appendChild(message_text);
//     display.appendChild(message_p);
//     display.classList.remove('d-none');
// }



// Vue.js enabled chat app
$(function(){
    const chat_app = new Vue({
        el: app_id,

        data: {
            active_user: {},
            users_list: [
                {
                    id: 3,
                    name: "Mark Doe",
                    last_message: "Hello",
                    last_message_date: "June 9",
                },
                {
                    id: 2,
                    name: "Jane Doe",
                    last_message: "Please don't forget",
                    last_message_date: "June 9",
                },
            ],
            messages_list: [
                {
                    id: 1,
                    text: 'Hello',
                    created_at: "11:01 AM | June 9",
                    sender: {
                        id: 1,
                        name: "John Doe",
                    },
                    receiver: {
                        id: 3,
                        name: "Mark Doe",
                    }
                },
                {
                    id: 2,
                    text: 'Wagwaan',
                    created_at: "11:01 AM | June 9",
                    sender: {
                        id: 3,
                        name: "Mark Doe",
                    },
                    receiver: {
                        id: 1,
                        name: "John Doe",
                    }
                },
            ],
            typed_message: "",
        },

        methods: {
            getRecentContants: function (event, user) {
                axios.get(get_contacts_url)
                .then(function (response) {
                    console.log(response);
                    // display_message(message_txt, "{{ Auth::user()->name }}")
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getUserMessages: function (event, user) {
                this.active_user = user;
                if (this.active_user) {
                    axios.get(get_messages_url, {
                        params: {
                            id: this.active_user.id
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        // display_message(message_txt, "{{ Auth::user()->name }}")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
            sendMessage: function (event) {
                if (this.typed_message.trim() != '' && this.active_user.id) {
                    // post form data
                    axios.post(send_message_url, {
                        message: this.typed_message,
                        receiver: this.active_user.id,
                    })
                    .then(function (response) {
                        console.log(response);
                        // display_message(message_txt, "{{ Auth::user()->name }}")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
        },

        created() {
            this.getRecentContants();

            // Listener for Event Broadcasts
            Echo.private(`instant-messaging.${laravel.user.id}`)
                .listen('.instant-messaging', (e) => {
                    console.log(e, 'Showing Message ...!');
                    display_message(e.message, e.user.name);
                });
        },
    });

    function display_message() {
        console.log('message');
    }
});
