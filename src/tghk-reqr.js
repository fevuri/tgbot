import * as Lz from 'lazy.js'
import statez from './statez.js'

const O = Object
const Prm = Promise

//TODO find better enum syntax / write wrapper module
//TODO move to own module in order to be reused in rcvr

export default class HkReqr {
  constructor({bot}) {
    O.assign(this, {bot})
  }

  start() {
    if (statez.STOPPED !== this.state) return Prm.reject(this.state)
    this.state = statez.STARTN

    //TODO make it more safe by not using the bot token but a crypt string
    return this.bot.req('setWebhook', {
      url: url.format(this.bot.genHkAddrO()),
      certificate: this.cert, //TODO is stream
    }).then(()=> {
      this.state = statez.STARTED
    })
  }

  stop() {
    if (statez.STARTED !== this.state) return Prm.reject(this.state)
    this.state = statez.STOPPN

    return this.bot.req('setWebhook').then(()=> {
      this.state = statez.STOPPED
    })
  }
}
