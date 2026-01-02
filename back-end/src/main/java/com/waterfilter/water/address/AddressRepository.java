package com.waterfilter.water.address;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

    // PostgreSQL with PostGIS (even better)
//    @Query(value = """
//         SELECT * FROM address 
//         WHERE ST_DWithin(
//             ST_SetSRID(ST_MakePoint(location_longitude, location_latitude), 4326)::geography,
//             ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
//             :radius * 1000
//         )
//         LIMIT :limit
//         """, nativeQuery = true)
//     List<Address> findNearbyAddressesPostGIS(
//             @Param("latitude") double latitude,
//             @Param("longitude") double longitude,
//             @Param("radius") double radiusKm,
//             @Param("limit") int limit
//     );

//     @Query("SELECT a FROM Address a WHERE " +
//            "a.location.latitude BETWEEN :minLat AND :maxLat " +
//            "AND a.location.longitude BETWEEN :minLon AND :maxLon")
//     List<Address> findAddressesWithinBoundingBox(
//             @Param("minLat") double minLat,
//             @Param("maxLat") double maxLat,
//             @Param("minLon") double minLon,
//             @Param("maxLon") double maxLon
//     );

     // Find specific employee's branch with coverage check
    @Query(value = """
        SELECT CASE WHEN ST_DWithin(
            ST_SetSRID(ST_MakePoint(a.location_longitude, a.location_latitude), 4326)::geography,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
            COALESCE(b.coverage_radius_km, :defaultRadius) * 1000
        ) THEN true ELSE false END
        FROM employee e
        JOIN branch b ON e.branch_id = b.id
        JOIN address a ON b.address_id = a.id
        WHERE e.id = :employeeId
        """, nativeQuery = true)
    Boolean isEmployeeWithinBranchCoverageNative(
        @Param("employeeId") Long employeeId,
        @Param("latitude") double latitude,
        @Param("longitude") double longitude,
        @Param("defaultRadius") double defaultRadius
    );
}
