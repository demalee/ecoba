/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/chat.js":
/*!******************************!*\
  !*** ./resources/js/chat.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 *  Vue.js enabled chat app
 */
$(function () {
  var chat_app = new Vue({
    el: app_id,
    data: {
      active_user: {},
      users_list: [],
      messages_list: [],
      typed_message: ""
    },
    methods: {
      getRecentContants: function getRecentContants(event) {
        var _this = this;

        axios.get(get_contacts_url).then(function (response) {
          _this.users_list = response.data.contacts;
        })["catch"](function (error) {
          console.log(error);
        });
      },
      getUserMessages: function getUserMessages(event, user) {
        var _this2 = this;

        this.active_user = user;

        if (this.active_user) {
          axios.get(get_messages_url + '/' + this.active_user.id).then(function (response) {
            _this2.messages_list = response.data.messages;
          })["catch"](function (error) {
            console.log(error);
          });
        }
      },
      sendMessage: function sendMessage(event) {
        var _this3 = this;

        if (this.typed_message.trim() != '' && this.active_user.id) {
          axios.post(send_message_url, {
            message: this.typed_message,
            receiver: this.active_user.id
          }).then(function (response) {
            _this3.messages_list.push(response.data.message);
          })["catch"](function (error) {
            console.log(error);
          });
          this.typed_message = '';
        }
      }
    },
    created: function created() {
      var _this4 = this;

      this.getRecentContants();
      Echo["private"]("instant-messaging.".concat(laravel.user.id)).listen('.instant-messaging', function (e) {
        console.log(_this4);

        if (_this4.active_user.id == e.message.sender.id) {
          _this4.messages_list.push(e.message);

          _this4.getRecentContants();
        }
      });
    },
    updated: function updated() {
      this.$nextTick(function () {
        console.log('Updated');
        scrollHistoryBottom();
      });
    }
  });

  function scrollHistoryBottom() {
    msg_history = document.getElementById('msg_history');
    msg_history.scrollTop = msg_history.scrollHeight;
  }
});

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/chat.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/kioko/Projects/ecoba/resources/js/chat.js */"./resources/js/chat.js");


/***/ })

/******/ });