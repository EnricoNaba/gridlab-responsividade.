// src/stores/useGuideStore.js
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { fetchRepoInfo } from '@/services/api';

export const useGuideStore = defineStore('guide', () => {
  // Inicialização blindada contra valores corrompidos no localStorage
  const initialCompleted = (() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const saved = localStorage.getItem('gridlab_completed_sections');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const completedSections = ref(Array.isArray(initialCompleted) ? initialCompleted : []);
  const repoData = ref(null);
  const isLoadingRepo = ref(false);
  const apiError = ref(null);
  const baseFontSize = ref(16); // Compartilhado com o laboratório de unidades

  watch(
    completedSections,
    (val) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const cleanArray = Array.isArray(val) ? val : [];
          localStorage.setItem('gridlab_completed_sections', JSON.stringify(cleanArray));
        }
      } catch {
        // no-op
      }
    },
    { deep: true }
  );

  const progressPercentage = computed(() => {
    const totalSections = 6;
    const list = Array.isArray(completedSections.value) ? completedSections.value : [];
    return Math.round((list.length / totalSections) * 100);
  });

  function toggleSectionComplete(sectionId) {
    if (!Array.isArray(completedSections.value)) {
      completedSections.value = [];
    }
    const idx = completedSections.value.indexOf(sectionId);
    if (idx === -1) {
      completedSections.value.push(sectionId);
    } else {
      completedSections.value.splice(idx, 1);
    }
  }

  function isSectionDone(sectionId) {
    if (!Array.isArray(completedSections.value)) return false;
    return completedSections.value.includes(sectionId);
  }

  async function loadRepositoryStats(owner = 'vuejs', repo = 'core') {
    isLoadingRepo.value = true;
    apiError.value = null;
    try {
      repoData.value = await fetchRepoInfo(owner, repo);
    } catch (error) {
      apiError.value = error.message || 'Não foi possível carregar os metadados do repositório.';
    } finally {
      isLoadingRepo.value = false;
    }
  }

  return {
    completedSections,
    repoData,
    isLoadingRepo,
    apiError,
    baseFontSize,
    progressPercentage,
    toggleSectionComplete,
    isSectionDone,
    loadRepositoryStats,
  };
});
