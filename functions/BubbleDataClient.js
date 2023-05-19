/**
 * BubbleDataClient class for communicating with Bubble's Data API.
 *
 * @example
 * const client = new BubbleDataClient('https://yourapp.bubbleapps.io/api/1.1', 'your_api_key');
 * const constraintsBuilder = new ConstraintsBuilder();
 * constraintsBuilder.addConstraint("unitname", "equals", "Unit A");
 * constraintsBuilder.addConstraint("unitnumber", "greater than", 3);
 * const constraints = constraintsBuilder.build();
 * const data = await client.getDataList('rentalunit', constraints);
 *
 * @module BubbleDataClient
 */
module.exports = class BubbleDataClient {

  /**
   * Constructs a new BubbleDataClient instance.
   *
   * @param {string} baseURL - The base URL for the Bubble API.
   * @param {string} apiKey - Your Bubble API key.
   */
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  /**
    * Retrieves a list of things based on the provided arguments.
    *
    * @async
    * @param {Object} arg - An object containing the following properties:
    *   @param {String} arg.type - Specifies the type of things to retrieve.
    *   @param {Array} [arg.constraints=[]] - Optional. An array of constraints to apply to the query.
    *   @param {Number} [arg.limit=100] - Optional. The maximum number of results to retrieve.
    *   @param {Number} [arg.cursor=0] - Optional. The starting cursor position for pagination.
    *   @param {Boolean} [arg.fetchAll=false] - Optional. Indicates whether to fetch all remaining results.
    * @throws {Error} Throws an error if the `type` property is missing in the `arg` object.
    * @returns {Promise<Object>} A promise that resolves to the response object containing the retrieved things.
  */
  async getThings(arg) {
    const type = arg.type,
        constraints = arg.constraints || [],
        limit = arg.limit || 100,
        cursor = arg.cursor || 0,
        fetchAll = arg.fetchAll || false;
    if (!type) {
      throw new Error('type is required');
    }
    const constraintParam = encodeURIComponent(JSON.stringify(constraints));
    
    const endpoint = `obj/${type}?limit=${limit}&cursor=${cursor}&constraints=${constraintParam}`;
    const url = this.baseURL + "/" + endpoint;
    try {
      const res = await request(url, this.apiKey, 'GET');

      if (fetchAll && res.response.remaining > 0) {
        const nextCursor = cursor + limit;
        arg.cursor = nextCursor;
        const remainingData = await this.getThings(arg);
        res.response.results = res.response.results.concat(remainingData.results);
        res.response.remaining = remainingData.remaining;
      }
    
      return res.response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Creates a new thing in the Bubble API.
   *
   * @param {string} type - The type of thing to create.
   * @param {Object} data - The data object containing the properties and values for the new thing.
   * @returns {Promise<Object>} A promise that resolves to the response object containing the created thing.
   */
  async createThing(type, data) {
    const endpoint = `obj/${type}`;
    const url = this.baseURL + "/" + endpoint;
    const response = await request(url, this.apiKey, 'POST', 'application/json', data);
    return response;
  }

  async createBulkThings(type, things) {
    const endpoint = `obj/${type}/bulk`;
    const url = this.baseURL + "/" + endpoint;
    const requestBody = things.map(thing => JSON.stringify(thing)).join('\n');
    const response = await request(url, this.apiKey, 'POST', "text/plain", requestBody);
    // parse plain text response into JSON
    const results = response.split('\n').map(line => JSON.parse(line));
    return results;
  }

  async updateThing(type, id, data) {
    const endpoint = `obj/${type}/${id}`;
    const url = this.baseURL + "/" + endpoint;
    const response = await request(url, this.apiKey, 'PUT', 'application/json', data);
    return response;
  }

}

// Helper function for making requests to the Bubble API
async function request(url, apiKey, method, content_type = 'application/json', data = null) {

  const headers = new Headers({
    'Content-Type': content_type,
    'Authorization': `Bearer ${apiKey}`,
  });

  var options = {
    method,
    headers,
  };

  if (data) {
    if (content_type === 'application/json') {
      options.body = JSON.stringify(data);
    } else if (content_type === 'text/plain') {
      options.body = data;
    } else {
      throw new Error(`Unsupported content type: ${content_type}`);
    }
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}, ${response.statusText}, ${response.url}`);
  }
  if (content_type === 'application/json') {
    if (response.status === 204) {
      return {};
    }
    return response.json();
  } else if (content_type === 'text/plain') {
    return response.text();
  }
}
