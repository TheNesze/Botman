const fs = require('fs')
const Discord = require('discord.js')

var token = fs.readFileSync('./token.txt').toString()

const client = new Discord.Client()

client.on('ready', () => {
    console.log('I am ready!')
});

client.on('message', message => {
    if (message.content.indexOf('ping') >= 0) {
        message.channel.sendMessage('pong')
    } else if (message.content == 'ájjále') {
        if (permitted(message.author.username)) {
            message.channel.sendMessage('baibai').then(() => {
                client.destroy()
            }); 
        } else {
            message.channel.sendMessage('Nincs jogosultságod a parancs használatához.')
        }
    } else if (message.content.startsWith('pucolj')) {
        var number = parseInt(message.content.split(' ')[1])
        if (number > 10) {
            message.channel.sendMessage('Max 10 üzenetet törölhetsz egyszerre.')
        } else {
            message.channel.bulkDelete(number + 1)
        }
    }
});


client.login(token)


var usernamelist = ['Nesze', 'legekkaka']

function permitted(username) {
    if (usernamelist.indexOf(username) >= 0) {
        return true
    } else {
        return false
    }
}