"use strict";
angular.module('myApp').controller('chatController', chatController);

chatController.$inject = ['chatService','notificationService','modalService','gameService'];

function chatController(chatService, notificationService, modalService, gameService) {
	var dvm = this;

	dvm.chats = [];

	gameService.getGameById(dvm.game, function(err, game){
		dvm.chats = game.chat;
	});

    var my_channel = notificationService.getClient().subscribe('game');

    my_channel.bind('chat', function(game){
        console.log('new chat is arrived' + game.chat);
        console.log(game.chat[game.chat.length - 1]);
        dvm.chats.push(game.chat[game.chat.length - 1]);
    });


	dvm.sendChat = function(chatString){
		chatService.sendChat(dvm.game, chatString, function(err, chat){
			dvm.sendText = "";
			if(err){
				console.log("chat has not been send, please try again");
			}
		});
	};
};