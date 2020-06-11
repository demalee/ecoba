@extends('layouts.app')

@section('xtr-css')
<link rel='stylesheet' href="{{ asset('/css/chat.css')}}" type='text/css' media='all'>
@endsection

@section('content')
<div class="container" id="chat-app">
    <!-- <h3 class=" text-center" style="color:#B73D25;">Chats</h3> -->
    <div class="messaging">
        <div class="inbox_msg">

            <!-- Chat user sidebar -->
            <div class="inbox_people">
                <div class="headind_srch">
                    <div class="recent_heading">
                        <h4>Recent</h4>
                    </div>
                    <div class="srch_bar">

                    </div>
                </div>

                <!-- Recent chat list -->
                <div class="inbox_chat">
                    <user-list
                        v-for="user in users_list"
                        v-bind:key="user.id"
                        v-bind:user="user"
                        v-bind:active_user="active_user"
                        v-bind:on_click="getUserMessages"
                    ></user-list>
                </div><!-- End of recent chat list -->
            </div>
            <!-- End of chat user sidebar -->

            <!-- Chat box -->
            <div class="mesgs">

                <!-- Messages display -->
                <div class="msg_history" id="msg_history">
                    <messages
                        v-for="message in messages_list"
                        v-bind:key="message.id"
                        v-bind:message="message"
                    ></messages>
                </div><!-- End of messages display -->

                <!-- Message Input -->
                <div class="type_msg" v-if="active_user.id">
                    <div class="input_msg_write">
                        <input type="text" class="write_msg" placeholder="Type a message" v-model="typed_message"/>
                        <button class="msg_send_btn" type="button" v-on:click="sendMessage">
                            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </div><!-- End of message Input -->
            </div>
            <!-- End of chat box -->

        </div>
    </div>
</div>
@endsection

@section('xtr-scripts')
<!-- Js to get the variables for chat.js file-->
<script type="text/javascript">
    // app DOM id (app_id = '#id')
    const app_id = "#chat-app";
    const get_contacts_url = "{{ route('messages.index') }}";
    const get_messages_url = "{{ route('messages.index') }}";
    const send_message_url = "{{ route('messages.store') }}";
</script>

<script src="https://kit.fontawesome.com/d9674c66e6.js" crossorigin="anonymous"></script>
<script src="{{ asset('/js/chat.js')}}"></script>
@endsection
