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
            users_list: [],
            messages_list: [],
            typed_message: "",
        },

        methods: {
            getRecentContants: function (event, user) {
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
                }
            },
        },

        created() {
            this.getRecentContants();

            // Listener for Event Broadcasts
            Echo.private(`instant-messaging.${laravel.user.id}`)
                .listen('.instant-messaging', (e) => {
                    console.log(e, 'Showing Message ...!');
                    // display_message(e.message, e.user.name);
                });
        },
    });

    window.chat_app = chat_app;
});
