package com.placementtracker.backend.service;

import com.placementtracker.backend.entity.InterviewRound;
import com.placementtracker.backend.repository.CompanyRepository;
import com.placementtracker.backend.repository.InterviewRoundRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewRoundService {

    private final InterviewRoundRepository interviewRoundRepository;
    private final CompanyRepository companyRepository;

    public InterviewRoundService(InterviewRoundRepository interviewRoundRepository, CompanyRepository companyRepository) {
        this.interviewRoundRepository = interviewRoundRepository;
        this.companyRepository = companyRepository;
    }

    // Helper: check the company belongs to this user
    private void verifyCompanyOwnership(Integer companyId, Integer userId) {
        companyRepository.findByIdAndUserId(companyId, userId)
                .orElseThrow(() -> new SecurityException("You do not have access to this company"));
    }

    public InterviewRound addRound(Integer userId, InterviewRound round) {
        verifyCompanyOwnership(round.getCompanyId(), userId);
        return interviewRoundRepository.save(round);
    }

    public List<InterviewRound> getRoundsByCompany(Integer userId, Integer companyId) {
        verifyCompanyOwnership(companyId, userId);
        return interviewRoundRepository.findByCompanyIdOrderByRoundDateAsc(companyId);
    }

    public InterviewRound updateRound(Integer userId, Integer id, InterviewRound updatedData) {
        InterviewRound existing = interviewRoundRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Round not found"));

        verifyCompanyOwnership(existing.getCompanyId(), userId);

        existing.setRoundType(updatedData.getRoundType());
        existing.setQuestionsAsked(updatedData.getQuestionsAsked());
        existing.setNotes(updatedData.getNotes());
        existing.setRoundDate(updatedData.getRoundDate());

        return interviewRoundRepository.save(existing);
    }

    public void deleteRound(Integer userId, Integer id) {
        InterviewRound existing = interviewRoundRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Round not found"));

        verifyCompanyOwnership(existing.getCompanyId(), userId);

        interviewRoundRepository.delete(existing);
    }
}
