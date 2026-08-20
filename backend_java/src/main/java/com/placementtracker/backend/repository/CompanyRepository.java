package com.placementtracker.backend.repository;

import com.placementtracker.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    List<Company> findByUserIdOrderByCreatedAtDesc(Integer userId);
    Optional<Company> findByIdAndUserId(Integer id, Integer userId);
    Integer countByUserId(Integer userId);
    Integer countByUserIdAndStatus(Integer userId, String status);
}
