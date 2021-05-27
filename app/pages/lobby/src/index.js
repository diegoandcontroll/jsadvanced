import { constants } from "../../_shared/constants.js";
import LobbyController from "./controller.js";
import LobbySocketBuilder from "./util/lobbySocketBuilder.js";

const user = {
  img: 'https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_macaco-256.png',
  username: 'yxydiego ' + Date.now()
}

const socketBuilder = new LobbySocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.lobby
})

const dependencies = {
  socketBuilder,
  user
}

await LobbyController.initialize(dependencies)