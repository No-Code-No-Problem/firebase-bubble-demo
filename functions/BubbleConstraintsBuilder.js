/**
 * ConstraintsBuilder class for building constraint objects for Bubble's Data API.
 *
 * @example
 * const constraintsBuilder = new ConstraintsBuilder()
 *  .addConstraint("unitname", "equals", "Unit A")
 *  .addConstraint("unitnumber", "greater than", 3)
 *  .build();
 *
 * @module ConstraintsBuilder
 */
module.exports = class ConstraintsBuilder {
  /**
   * Constructs a new ConstraintsBuilder instance.
   */
  constructor() {
    this.constraints = [];
  }

  /**
   * Adds a constraint to the list of constraints.
   * https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/data-api-requests#constraint-types
   * 
   * @param {string} key - The field name on which the constraint is applied.
   * @param {string} constraintType - The type of constraint (e.g., "equals", "greater than").
   * @param {*} value - The value to compare against the field's value.
   * @returns {ConstraintsBuilder} The current instance, allowing for method chaining.
   */
  addConstraint(key, constraintType, value) {
    this.constraints.push({
      key: key,
      constraint_type: constraintType,
      value: value
    });
    return this;
  }

  /**
  * Adds a sort constraint to the list of constraints.
  *
  * @param {string} sortField - The field name to sort by.
  * @param {boolean} descending - Indicates whether to sort in descending order (true) or ascending order (false).
  * @returns {ConstraintsBuilder} The current instance, allowing for method chaining.
  */
  addSortConstraint(sortField, descending) {
    this.constraints.push({
      sort_field: sortField,
      descending: descending.toString()
    });
    return this;
  }

  /**
   * Builds and returns the list of constraints.
   *
   * @returns {Array} An array of constraint objects.
   */
  build() {
    return this.constraints;
  }
};
