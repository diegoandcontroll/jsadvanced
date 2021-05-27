export default class Attendee {
  constructor({ id, username, img, isSpeaker, roomId, peerId }) {
      this.id = id
      this.username = username
      this.img = img || ''
      this.isSpeaker = isSpeaker
      this.roomId = roomId
      const name = username || 'Anonymous User'
      this.username = name
      const [firstname, lastname] = name.split(/\s/)
      this.firstname = firstname
      this.lastname = lastname
      
      this.peerId = peerId
  }
}