const Clickup = require('clickup.js');

/**
 * Clickup client API
 * Example:
 * ```
 * const clickup_api = new ClickUpAPI("token_here", space_id);
 * const tasks = await a.getTasks("listName");
 * ```
 */
class ClickUpAPI {
  /**
   * Create a clickup client API for a specific space identified with spaceId
   * @param {string} token clickup api token
   * @param {int} spaceId the clickup space where lists and tasks are managed
   */
  constructor(token, spaceId) {
    this.spaceId = spaceId;
    this.clickupClient = new Clickup.Clickup(token);
  }

  /**
   * Create a list based on a channel's name
   * @param {string} listName
   * @return {int} id of the created list
   */
  async createList(listName) {
    const data = {name: listName};
    const resp = await this.clickupClient.spaces.
        createFolderlessList(this.spaceId, data);
    return parseInt(resp.body.id);
  }

  /**
   * Get list id from its name
   * @param {str} listName
   * @return {int|undefined} id of the searched list,
   * or undefined if it doesn't exist
   */
  async getListId(listName) {
    const resp =
        await this.clickupClient.spaces.getFolderlessLists(this.spaceId);
    const lists = resp.body['lists'];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].name == listName) {
        return parseInt(lists[i].id);
      }
    }
    return;
  }

  /**
   * Create task inside list. Create a list `listName` if doesn't already exist
   * @param {string} listName
   * @param {string} taskName
   * @param {string} taskDescription
   * @return {int} id of the created task
   */
  async createTask(listName, taskName, taskDescription) {
    // Create list if doesn't exist
    let listId = await this.getListId(listName);
    if (typeof listId === 'undefined') {
      listId = await this.createList(listName);
    }
    const data = {name: taskName, description: taskDescription};
    const resp = await this.clickupClient.lists.createTask(listId, data);
    return parseInt(resp.body.id);
  }

  /**
   * Get tasks from a specific list
   * @param {string} listName
   * @return {list} list of the different tasks in list `listName`
   */
  async getTasks(listName) {
    const listId = await this.getListId(listName);
    const resp = await this.clickupClient.lists.getTasks(listId);
    return resp.body.tasks;
  }
}

