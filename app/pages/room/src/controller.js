import { constants } from "../../_shared/constants.js";  
import Attendee from "./entities/attendee.js";
export default class RoomController{
  constructor({roomInfo,socketBuilder, view}){
    this.socketBuilder = socketBuilder;
    this.roomInfo = roomInfo;
    this.socket = {};
    this.view = view;
  }

  static async initialize(dependencies){
    return new RoomController(dependencies)._initialize()
  }
  async _initialize(){
    this._setupViewEvents();

    this.socket = this._setupSocket();

    this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo)
  }
  _setupViewEvents(){
    this.view.updateRoomTopic(this.roomInfo.room);
    this.view.updateUserImage(this.roomInfo.user)
  }
  _setupSocket(){
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .setOnUserProfileUpgrade(this.onUserProfileUpgrade())
      .setOnRoomUpdated(this.roomUpdated())
      .build()
  }

  onUserProfileUpgrade() {
    return (data) => {
      const attendee = new Attendee(data)
      console.log('onUserProfileUpgrade', attendee)
      if(attendee.isSpeaker){
        this.view.addAttendeeOnGrid(attendee, true)
      }
     };
  }

  roomUpdated() {
    return (room) =>{
      this.view.updateAttendeeOnGrid(room) 
      console.log('room list!', room)
    } 
  }

  onUserDisconnected() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log(`${attendee.firstname} disconnect`, attendee.id)
      this.view.removeItemFromGrid(attendee.id) 
    }
  }

  onUserConnected() {
    return (data) =>{
      const attendee = new Attendee(data)
      console.log('user connected!',attendee);
      this.view.addAttendeeOnGrid(attendee)
    } 
  }
}