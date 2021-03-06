goog.provide('ol.geom.AbstractCollection');

goog.require('ol.extent');
goog.require('ol.geom.Geometry');



/**
 * A collection of geometries.  This constructor is not to be used directly.
 *
 * @constructor
 * @extends {ol.geom.Geometry}
 */
ol.geom.AbstractCollection = function() {
  goog.base(this);

  /**
   * @type {Array.<ol.geom.Geometry>}
   * @protected
   */
  this.components = null;

  /**
   * @type {ol.Extent}
   * @protected
   */
  this.bounds = null;

};
goog.inherits(ol.geom.AbstractCollection, ol.geom.Geometry);


/**
 * @inheritDoc
 */
ol.geom.AbstractCollection.prototype.getBounds = function() {
  if (goog.isNull(this.bounds)) {
    var bounds = ol.extent.createEmpty();
    var components = this.components;
    for (var i = 0, ii = components.length; i < ii; ++i) {
      ol.extent.extend(bounds, components[i].getBounds());
    }
    this.bounds = bounds;
  }
  return this.bounds;
};


/**
 * @return {Array.<ol.geom.Geometry>} Components.
 */
ol.geom.AbstractCollection.prototype.getComponents = function() {
  return this.components;
};


/**
 * @inheritDoc
 */
ol.geom.AbstractCollection.prototype.getCoordinates = function() {
  var count = this.components.length;
  var coordinates = new Array(count);
  for (var i = 0; i < count; ++i) {
    coordinates[i] = this.components[i].getCoordinates();
  }
  return coordinates;
};


/**
 * @inheritDoc
 */
ol.geom.AbstractCollection.prototype.getType = goog.abstractMethod;


/**
 * Listener for component change events.
 * @param {goog.events.Event} evt Change event.
 * @protected
 */
ol.geom.AbstractCollection.prototype.handleComponentChange = function(evt) {
  this.bounds = null;
  this.dispatchChangeEvent();
};


/**
 * @inheritDoc
 */
ol.geom.AbstractCollection.prototype.transform = function(transform) {
  var components = this.components;
  for (var i = 0, ii = components.length; i < ii; ++i) {
    components[i].transform(transform);
  }
  this.bounds = null;
};
