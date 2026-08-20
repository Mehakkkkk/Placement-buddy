package com.placementtracker.backend.repository;

import com.placementtracker.backend.entity.DsaQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface DsaQuestionRepository extends JpaRepository<DsaQuestion, Integer> {
    Optional<DsaQuestion> findByIdAndUserId(Integer id, Integer userId);
    Integer countByUserId(Integer userId);
    Integer countByUserIdAndStatus(Integer userId, String status);

    @Query("SELECT d FROM DsaQuestion d WHERE d.userId = :userId " +
           "AND (:topic IS NULL OR d.topic = :topic) " +
           "AND (:difficulty IS NULL OR d.difficulty = :difficulty) " +
           "AND (:status IS NULL OR d.status = :status) " +
           "ORDER BY d.createdAt DESC")
    List<DsaQuestion> findWithFilters(
        @Param("userId") Integer userId,
        @Param("topic") String topic,
        @Param("difficulty") String difficulty,
        @Param("status") String status
    );
}