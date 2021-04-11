package edu.brown.cs.termproject.router;

import edu.brown.cs.termproject.iotools.DistanceCalculator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * The class for clustering Locatables.
 * @param <L> locatable object.
 */
public class Clustering<L extends Locatable> {

  private final double maxDistance; // in kilometers
  private static final int RADIAN = 180;

  public Clustering(double maxDistance) {
    this.maxDistance = maxDistance;
  }

  /**
   * Creates clusters from a list of Locatable.
   * @param locations list of Locatable.
   * @return Set of clusters represented as set of Locatable.
   */
  public Map<Point, List<L>> makeClusters(List<L> locations) {
    Map<Point, List<L>> clusters = new HashMap<>();
    // iterate through location list
    for (L curLoc : locations) {
      if (clusters.isEmpty()) {
        List<L> newList = new ArrayList<>();
        newList.add(curLoc);
        clusters.put(new Point(curLoc.getLat(), curLoc.getLon()), newList);
      } else {
        Point newCentroid = null;
        //iterate through cluster map
        for (Map.Entry<Point, List<L>> entry : clusters.entrySet()) {
          //if the distance b/w centroid and location is less than the maxDistance, add to cluster
          if (DistanceCalculator.getDistance(curLoc, entry.getKey()) < this.maxDistance) {
            List<L> newCluster = entry.getValue();
            newCluster.add(curLoc);
            newCentroid = getCentroid(newCluster);
            clusters.remove(entry.getKey());
            clusters.put(newCentroid, newCluster);
            break;
          }
        }
        //if the centroid was altered, then check if it's close enough to another
        if (newCentroid != null) {
          //optimization for when two centroids are close, then combine
          Iterator<Map.Entry<Point, List<L>>> iter = clusters.entrySet().iterator();
          while (iter.hasNext()) {
            Map.Entry<Point, List<L>> curEntry = iter.next();
            if (!curEntry.getKey().equals(newCentroid)
                && DistanceCalculator.getDistance(curEntry.getKey(), newCentroid) < maxDistance) {
              List<L> toMergeCluster = clusters.get(newCentroid);
              curEntry.getValue().addAll(toMergeCluster);
              iter.remove();
            }
          }
        } else { //if the location does not belong to any cluster, then make a new entry in map
          List<L> newList = new ArrayList<>();
          newList.add(curLoc);
          clusters.put(new Point(curLoc.getLat(), curLoc.getLon()), newList);
        }
      }
    }
    return clusters;
  }

  /**
   * Gets the middle centroid point of a cluster given a list of locations.
   * @param locations list of Locatable.
   * @return the centroid point of the cluster.
   */
  public Point getCentroid(List<L> locations) {
    if (locations.size() <= 0) {
      return null;
    }

    int numLoc = locations.size();

    double x = 0.0;
    double y = 0.0;
    double z = 0.0;

    for (L location : locations) {
      double lat = location.getLat() * Math.PI / RADIAN;
      double lon = location.getLon() * Math.PI / RADIAN;

      double a = Math.cos(lat) * Math.cos(lon);
      double b = Math.cos(lat) * Math.sin(lon);
      double c = Math.sin(lat);

      x += a;
      y += b;
      z += c;
    }

    x = x / numLoc;
    y = y / numLoc;
    z = z / numLoc;

    double lon = Math.atan2(y, x);
    double hyp = Math.sqrt(x * x + y * y);
    double lat = Math.atan2(z, hyp);

    double newX = (lat * RADIAN / Math.PI);
    double newY = (lon * RADIAN / Math.PI);

    return new Point(newX, newY);
  }
}
