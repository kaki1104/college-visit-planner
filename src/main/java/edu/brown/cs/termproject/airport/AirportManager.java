package edu.brown.cs.termproject.airport;

import edu.brown.cs.termproject.database.AirportSQLManager;
import edu.brown.cs.termproject.iotools.DistanceCalculator;
import edu.brown.cs.termproject.router.Locatable;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AirportManager {

  private final List<Airport> airports;
  /**
   * Constructor for AirportManager.
   * @param path path of sql file to read.
   */
  public AirportManager(String path) throws SQLException {
    AirportSQLManager sqlManager = new AirportSQLManager();
    sqlManager.connect(path);
    airports = sqlManager.getAllAirports();
  }
  /**
   * Gets the closest airport based on the each cluster in map.
   * @param clusters map of centroid to Locatable.
   * @return a map, mapping an airport to its cluster.
   */
  public Map<Airport, List<Locatable>> getNearestAirports(
      Map<Locatable, List<Locatable>> clusters) {
    Map<Airport, List<Locatable>> nearestAirports = new HashMap<>();
    for (Map.Entry<Locatable, List<Locatable>> entry : clusters.entrySet()) {
      Locatable curCentroid = entry.getKey();
      Airport bestAirport = getNearestAirport(curCentroid);
      //if there is already the key with the same airport, combine
      if (nearestAirports.containsKey(bestAirport)) {
        nearestAirports.get(bestAirport).addAll(entry.getValue());
      } else {
        nearestAirports.put(bestAirport, entry.getValue());
      }
    }
    return nearestAirports;
  }
  /**
   * Gets the closest airport based on a specific location.
   * @param location the location.
   * @return the nearest airport.
   */
  public Airport getNearestAirport(Locatable location) {
    double bestDistance = Double.POSITIVE_INFINITY;
    Airport bestAirport = null;
    for (Airport airport : airports) {
      double newDistance = DistanceCalculator.getDistance(airport, location);
      if (newDistance < bestDistance) {
        bestDistance = newDistance;
        bestAirport = airport;
      }
    }
    return bestAirport;
  }
}