import axios from 'axios'

class User {
    constructor(id, name) {
      // invokes the setter
      this.name = name;

      await getUserInfo(id)
    }

    async getUserInfo(id) {
        try {
            const { data: user } = await axios.get(`/user/${id}`)
        
            this.user = user
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
  }
  
  let user = new User("John");
  alert(user.name); // John
  
  user = new User("");