import axios from "axios";

class UserService {
  // static BASE_URL = "http://localhost:8083";

  static async login(email, password) {
    try {
      const response = await axios.post('http://localhost:8083/auth/login', {email, password});
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await axios.post('http://localhost:8083/auth/register', userData
      );

      return response.data;

    } catch (error) {
      throw error;
    }
  }

 static async refreshToken(refreshToken) {
    try {
      const response = await axios.post('http://localhost:8083/auth/refresh', { token: refreshToken });
      if (response.status === 200) {
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get('http://localhost:8083/admin/get-all-users',
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async getAllUserMembers(token) {
    try {
      const response = await axios.get('http://localhost:8083/users/get-user-members',
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async getYourProfile(token) {
    try {
      const response = await axios.get('http://localhost:8083/user/me',
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async getComicFromUser(token) {
    try {
      const response = await axios.get('http://localhost:8083/user/comic-list',
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(`http://localhost:8083/user/${userId}`,
        {
          headers: {Authorization: `Bearer ${token}`} 
        }
      );
      // console.log(response);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async findUserByName(name, token) {
    try {
      const response = await axios.get("http://localhost:8083/users/", {params: {
        name: name, // include the name in the query parameters
      },
          headers: {Authorization: `Bearer ${token}`} 
    });
      // console.log(response);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(`http://localhost:8083/admin/delete/${userId}`,
        {
          headers: {Authorization: `Bearer ${token}`} 
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, userData,token) {
    try {
      const response = await axios.put(`http://localhost:8083/admin/update/${userId}`, userData,
        {
          headers: {Authorization: `Bearer ${token}`} 
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async addToLibrary(comic_id, token) {
    try {
      const response = await axios.post(`http://localhost:8083/titles/follows?comic_id=${comic_id}`,
        {}, // Empty body
        {
          headers: {Authorization: `Bearer ${token}`,},
        }
      );
      return response.data;

    } catch (error) {
      // console.error('Error adding to library:', error.response || error.message);
      throw error;
    }
  }

  static async removeComicFromLibrary(userId, comicList, comicListRemove) {

    try {
      const response = await axios.put(`http://localhost:8083/remove/comics/${userId}`,
        {comicList: comicList, 
        comicListRemove: comicListRemove
        }, 
        {
        headers: {
        'Content-Type': 'application/json'
        }
        }
      );
      return response.data;

    } catch (error) {
      // console.error('Error remove comic from library:', error.response || error.message);
      throw error;
    }
  }

  /* AUTHENCATION CHECK */
  static logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    // localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem('role');
    return role === "ROLE_ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem('role');
    return role === "ROLE_USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }

}

export default UserService;