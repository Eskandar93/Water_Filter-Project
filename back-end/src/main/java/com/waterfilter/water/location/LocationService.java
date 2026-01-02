package com.waterfilter.water.location;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
  private final AddressRepository addressRepository;

  // For basic distance calculation
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth's radius in kilometers
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }
    
    // public List<Address> findNearbyAddresses(
    //     double userLat, double userLon, 
    //     double radiusKm, int limit
    // ) {
    //     // Try PostGIS query first
    //     try {
    //         List<Address> results = addressRepository.findNearbyAddressesPostGIS(
    //             userLat, userLon, radiusKm, limit
    //         );
    //         if (!results.isEmpty()) {
    //             return results;
    //         }
    //     } catch (Exception e) {
    //         // Fall back to Java implementation
    //     }
        
    //     return findWithBoundingBoxOptimized(userLat, userLon, radiusKm, limit);
    // }
    
    // // ✅ Changed to return Addresses
    // private List<Address> findWithBoundingBoxOptimized(
    //       double userLat, double userLon,
    //       double radiusKm, int limit
    // ) {
    //     double latRange = radiusKm / 111.0;
    //     double cosLat = Math.cos(Math.toRadians(userLat));
    //     double lonRange = cosLat != 0 ? radiusKm / (111.0 * cosLat) : latRange;
        
    //     List<Address> candidates = addressRepository.findAddressesWithinBoundingBox(
    //         userLat - latRange, userLat + latRange,
    //         userLon - lonRange, userLon + lonRange
    //     );
        
    //     // Calculate distances using embedded location
    //     return candidates.stream()
    //         .filter(address -> 
    //             calculateDistance(userLat, userLon,
    //                 address.getLocation().getLatitude(),
    //                 address.getLocation().getLongitude()
    //             ) <= radiusKm
    //         )
    //         .sorted(Comparator.comparingDouble(address -> 
    //             calculateDistance(userLat, userLon,
    //                 address.getLocation().getLatitude(),
    //                 address.getLocation().getLongitude()
    //             )
    //         ))
    //         .limit(limit)
    //         .collect(Collectors.toList());
    // }
}
