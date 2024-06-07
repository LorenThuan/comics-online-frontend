import axios from "axios";

class UserService {
  // static BASE_URL = "http://localhost:8083";

  static async login(email, password) {
    try {
      const response = await axios.post('http://localhost:8083/auth/login', {email, password});
      console.log(response);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post('http://localhost:8083/auth/register', userData,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );

      return response.data;

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

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(`http://localhost:8083/user/${userId}`,
        {
          headers: {Authorization: `Bearer ${token}`} 
        }
      );
      
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
      const response = await axios.put(`http://localhost:8083/user/update/${userId}`, userData,
        {
          headers: {Authorization: `Bearer ${token}`} 
        }
      );
      
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  /* AUTHENCATION CHECK */
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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