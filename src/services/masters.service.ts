/**
 * Masters Service
 * Handles master data API calls
 */

import { BaseApiService, ApiServiceResponse } from './base.service';
import type {
  AcademicYearsResponse,
  GradesResponse,
  SubjectsResponse,
  CurrenciesResponse,
  LanguagesResponse,
  MediumsResponse,
  PaginationParams,
} from '@/types/masters.types';

export class MastersService extends BaseApiService {
  private static readonly BASE_PATH = '/core';

  private static readonly ENDPOINTS = {
    academicYears: `${this.BASE_PATH}/mst-academic-year`,
    grades: `${this.BASE_PATH}/mst-grade`,
    subjects: `${this.BASE_PATH}/mst-subject`,
    currencies: `${this.BASE_PATH}/mst-currency`,
    languages: `${this.BASE_PATH}/mst-language`,
    mediums: `${this.BASE_PATH}/mst-medium`,
  };

  /**
   * Helper to build pagination params
   */
  private static buildPaginationParams(params?: PaginationParams): Record<string, string> {
    const queryParams: Record<string, string> = {};

    if (params?.page !== undefined) {
      queryParams.page = params.page.toString();
    }
    if (params?.limit !== undefined) {
      queryParams.limit = params.limit.toString();
    }
    if (params?.sortOrder) {
      queryParams.sortOrder = params.sortOrder;
    }

    return queryParams;
  }

  // =============================================================================
  // ACADEMIC YEARS
  // =============================================================================

  /**
   * Fetch academic years with pagination
   */
  static async getAcademicYears(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<AcademicYearsResponse>> {
    return this.get<AcademicYearsResponse>(
      this.ENDPOINTS.academicYears,
      this.buildPaginationParams(params),
      'MastersService.getAcademicYears'
    );
  }

  // =============================================================================
  // GRADES
  // =============================================================================

  /**
   * Fetch grades with pagination
   */
  static async getGrades(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<GradesResponse>> {
    return this.get<GradesResponse>(
      this.ENDPOINTS.grades,
      this.buildPaginationParams(params),
      'MastersService.getGrades'
    );
  }

  // =============================================================================
  // SUBJECTS
  // =============================================================================

  /**
   * Fetch subjects with pagination
   */
  static async getSubjects(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<SubjectsResponse>> {
    return this.get<SubjectsResponse>(
      this.ENDPOINTS.subjects,
      this.buildPaginationParams(params),
      'MastersService.getSubjects'
    );
  }

  // =============================================================================
  // CURRENCIES
  // =============================================================================

  /**
   * Fetch currencies with pagination
   */
  static async getCurrencies(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<CurrenciesResponse>> {
    return this.get<CurrenciesResponse>(
      this.ENDPOINTS.currencies,
      this.buildPaginationParams(params),
      'MastersService.getCurrencies'
    );
  }

  // =============================================================================
  // LANGUAGES
  // =============================================================================

  /**
   * Fetch languages with pagination
   */
  static async getLanguages(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<LanguagesResponse>> {
    return this.get<LanguagesResponse>(
      this.ENDPOINTS.languages,
      this.buildPaginationParams(params),
      'MastersService.getLanguages'
    );
  }

  // =============================================================================
  // MEDIUMS
  // =============================================================================

  /**
   * Fetch mediums with pagination
   */
  static async getMediums(
    params?: PaginationParams
  ): Promise<ApiServiceResponse<MediumsResponse>> {
    return this.get<MediumsResponse>(
      this.ENDPOINTS.mediums,
      this.buildPaginationParams(params),
      'MastersService.getMediums'
    );
  }
}

export default MastersService;
