const fs = require('fs')
const Discord = require('discord.js')

var token = fs.readFileSync('./token.txt').toString()
var cfg = JSON.parse(fs.readFileSync('config.json').toString())
var strings = JSON.parse(fs.readFileSync('strings.json').toString())

const client = new Discord.Client()

client.on('ready', () => {
    console.log(strings.inf.ready)
});

client.on('message', message => {
    if (message.content.startsWith(cfg.prefix)) {
        var msg = message.content.substr(1).split(' ')
        switch (msg[0]) {
            case 'set':
                switch (msg[1]) {
                    case 'prefix':
                        cfg.prefix = msg[2]
                        saveConfig()
                        message.channel.sendMessage(strings.inf.commandPrefixChanged + cfg.prefix)
                        break
                    default:
                        message.channel.sendMessage(strings.err.varNotFound + msg[1])
                }
                break
            case 'get':
                switch (msg[1]) {
                    case 'prefix':
                        message.channel.sendMessage(strings.inf.commandPrefix + cfg.prefix)
                        break
                    default:
                        message.channel.sendMessage(strings.err.varNotFound + msg[1])
                }
                break
            case 'delete':
                var n = parseInt(msg[1])
                if (n > 10) {
                    message.channel.sendMessage(strings.inf.maxDeleteCount)
                } else {
                    message.channel.bulkDelete(n + 1).then(() => {
                        message.channel.sendMessage(n + strings.inf.deleteSuccessful).then((tempMsg) => {
                            setTimeout(() => {
                                tempMsg.delete()
                            }, 3000)
                        })
                    })
                }
                break
            case 'stop':
                message.channel.sendMessage(strings.inf.shutdown).then(() => {
                    client.destroy()
                })
                break
            case 'reload':
                switch(msg[1]){
                    case 'strings':
                        updateStrings()
                        message.channel.sendMessage(strings.inf.messagesUpdated)
                        break
                    default:
                        message.channel.sendMessage(strings.err.varNotFound+msg[1])
                }
                break
            default:
                message.channel.sendMessage(strings.err.commandNotFound)
        }
    }
})

client.login(token)

function saveConfig() {
    fs.writeFileSync('config.json', JSON.stringify(cfg))
}

function updateStrings(){
    strings = JSON.parse(fs.readFileSync('strings.json').toString())
}