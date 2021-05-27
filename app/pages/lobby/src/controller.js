export default class LobbyController{
  constructor({ socketBuilder, user}){
    this.socketBuilder = socketBuilder
    this.user = user
    this.socket = {}
  }

  static initialize(dependencies){
    return new LobbyController(dependencies)._init()
  }

  async _init(){
    this.socket =  this._setupSocket()
  }

  _setupSocket(){
    return this.socketBuilder
    .setOnLobbyUpdated(this.onLobbyUpdated())
    .build()
  }

  onLobbyUpdated() {
    return (rooms) => {
      console.log('[Rooms] -> ', rooms)
    }
  }
}