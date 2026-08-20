package com.placementtracker.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_questions")
@Data
public class DsaQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 100)
    private String topic;

    @Column(length = 20)
    private String difficulty = "Medium";

    @Column(length = 20)
    private String status = "Not Started";

    @Column(length = 500)
    private String link;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
