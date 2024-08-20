import config from './config';

export default class Data {
  /**
   * Function to make Fetch requests to our custom REST API
   * @param {*} path - route or path to API endpoint e.g. /courses, /users
   * @param {*} method - e.g. POST, GET
   * @param {*} body - body of the request (optional)
   * @param {*} requiresAuth - whether the API request requires authentication
   * @param {*} credentials - if API request requires authentication, enter in user's credentials (username/email address and password)
   * @returns {function} Make the Fetch API request
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  /**
   * Get the user from the database for Sign In
   * @param {String} username - for Authentication, the user's email address acts as the "username"
   * @param {String} password 
   * @returns API response if successful
   */
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return response.json().then(message => message);
    }
    else {
      throw new Error();
    }
  }

  /**
   * Create a new user in the database
   * @param {Object} user 
   * @returns empty response if successful
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Get all available courses
   * @returns API response if successful
   */
  async getCourses() {
    const response = await this.api('/courses', 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

  /**
   * Get all available papers
   * @returns API response if successful
   */
  async getPapers() {
    const response = await this.api('/papers', 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

    /**
   * Get all available patents
   * @returns API response if successful
   */
  async getPatents() {
    const response = await this.api('/patents', 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

  /**
   * Get a specific course by id
   * @param {String} id - Course ID
   * @returns API response if successful
   */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

   /**
   * Get a specific paper by id
   * @param {String} id - Course ID
   * @returns API response if successful
   */
   async getPaper(id) {
    const response = await this.api(`/papers/${id}`, 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      console.log("hi")
      throw new Error();
    }
  }

   /**
   * Get a specific patent by id
   * @param {String} id - patent ID
   * @returns API response if successful
   */
   async getPatent(id) {
    const response = await this.api(`/patents/${id}`, 'GET', null, false);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      console.log("hi")
      throw new Error();
    }
  }

  /**
   * Create a new course
   * @param {Object} course - with title, description, estimated time and materials needed
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Create a new paper
   * @param {Object} paper - with title, description, authors, conference, date
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async createPaper(paper, username, password) {
    const response = await this.api('/papers', 'POST', paper, true, { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Create a new patent
   * @param {Object} patent - with title, description, authors, conference, date
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async createPatent(patent, username, password) {
    const response = await this.api('/patents', 'POST', patent, true, { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Delete a specific course
   * Only users who are authors of the course are authorised to delete the course
   * @param {String} id - Course ID
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Delete a specific paper
   * Only users who are authors of the course are authorised to delete the course
   * @param {String} id - Course ID
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async deletePaper(id, username, password) {
    const response = await this.api(`/papers/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Delete a specific patent
   * Only users who are authors of the course are authorised to delete the course
   * @param {String} id - Course ID
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async deletePatent(id, username, password) {
    const response = await this.api(`/patents/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Update a particular course
   * @param {String} id - Course ID
   * @param {Object} course - with updated title, description, estimated time and materials needed
   * @param {String} username - user's email address
   * @param {String} password 
   * @returns empty response if successful
   */
  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   /**
 * Update a specific paper
 * @param {String} id - Paper ID
 * @param {Object} paper - The paper object with updated details
 * @param {String} username - User's email address
 * @param {String} password - User's password
 * @returns empty response if successful
 */
async updatePaper(id, paper, username, password) {
  const response = await this.api(`/papers/${id}`, 'PUT', paper, true, { username, password });
  if (response.status === 204) {
    return [];
  } else if (response.status === 400) {
    return response.json().then(data => data.errors);
  } else {
    throw new Error();
  }
}

  /**
   /**
 * Update a specific patent
 * @param {String} id - Paper ID
 * @param {Object} patent - The paper object with updated details
 * @param {String} username - User's email address
 * @param {String} password - User's password
 * @returns empty response if successful
 */
   async updatePatent(id, patent, username, password) {
    const response = await this.api(`/patents/${id}`, 'PUT', patent, true, { username, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }
  
}
