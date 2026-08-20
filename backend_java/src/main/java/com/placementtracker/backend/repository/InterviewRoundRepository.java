package com.placementtracker.backend.repository;

import com.placementtracker.backend.entity.InterviewRound;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InterviewRoundRepository extends JpaRepository<InterviewRound, Integer> {
    List<InterviewRound> findByCompanyIdOrderByRoundDateAsc(Integer companyId);
    Optional<InterviewRound> findById(Integer id);
}
