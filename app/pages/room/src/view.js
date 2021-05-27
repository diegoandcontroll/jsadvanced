import Attendee from "./entities/attendee.js";
import getTemplate from "./templates/attendeeTemplate.js";
const gridAttendees = document.getElementById('gridAttendees');
const gridSpeakers = document.getElementById('gridSpeakers');
const imgUser = document.getElementById('imgUser');
const topicElement = document.getElementById('pTopic');
export default class View {
  static updateRoomTopic({topic}){
    topicElement.innerHTML = topic;
  }
  static updateUserImage({img, username}){
    imgUser.src = img;
    imgUser.al = username;
  }

  static addAttendeeOnGrid(item, removeFirst = false){
    const attendee = new Attendee(item)
    const id = attendee.id
    const htmlTemplate = getTemplate(attendee)
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees
    if(removeFirst){
      View.removeItemFromGrid(id)
      baseElement.innerHTML += htmlTemplate
      return;
    }
    
    const existingItem = View._getExistingItemOnGrid({id, baseElement})

    if(existingItem){
      existingItem.innerHTML = htmlTemplate
      return;
    }

    baseElement.innerHTML += htmlTemplate

  } 
  static _getExistingItemOnGrid({id, baseElement = document}){
    const existingItem = baseElement.querySelector(`[id="${id}"]`)
    return existingItem 
  }
  static removeItemFromGrid(id){
    const existingElement = View._getExistingItemOnGrid({id})
    existingElement?.remove()
  }

  static updateAttendeeOnGrid(users){
    users.forEach(item => View.addAttendeeOnGrid(item))
  }
}