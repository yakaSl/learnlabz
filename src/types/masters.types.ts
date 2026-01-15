/**
 * Masters Module Types
 * Type definitions for master data entities
 */

// =============================================================================
// PAGINATION TYPES
// =============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Backend pagination structure (in metadata)
export interface BackendPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Helper to convert backend pagination to frontend format
export function convertPagination(backendPagination?: BackendPagination): PaginationMeta {
  if (!backendPagination) {
    return {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  return {
    currentPage: backendPagination.page,
    totalPages: backendPagination.totalPages,
    totalItems: backendPagination.total,
    itemsPerPage: backendPagination.limit,
    hasNextPage: backendPagination.hasNext,
    hasPreviousPage: backendPagination.hasPrev,
  };
}

// =============================================================================
// BASE MASTER ENTITY
// =============================================================================

/**
 * Common fields for all master entities
 */
export interface BaseMaster {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  name: string;
  code: string;
  description: string;
}

// =============================================================================
// ACADEMIC YEAR MASTER
// =============================================================================

export interface AcademicYear extends BaseMaster {
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  isActive?: boolean;
}

// Backend returns flat arrays with pagination in metadata.pagination
export type AcademicYearsResponse = AcademicYear[];

// =============================================================================
// GRADE MASTER
// =============================================================================

export interface Grade extends BaseMaster {
  displayOrder?: number;
  isActive?: boolean;
}

export type GradesResponse = Grade[];

// =============================================================================
// SUBJECT MASTER
// =============================================================================

export interface Subject extends BaseMaster {
  category?: string;
  isActive?: boolean;
}

export type SubjectsResponse = Subject[];

// =============================================================================
// CURRENCY MASTER
// =============================================================================

export interface Currency extends BaseMaster {
  symbol: string;
  isDefault?: boolean;
  isActive?: boolean;
}

export type CurrenciesResponse = Currency[];

// =============================================================================
// LANGUAGE MASTER
// =============================================================================

export interface Language extends BaseMaster {
  nativeName: string;
  isDefault?: boolean;
  isActive?: boolean;
}

export type LanguagesResponse = Language[];

// =============================================================================
// MEDIUM MASTER
// =============================================================================

export interface Medium extends BaseMaster {
  isActive?: boolean;
}

export type MediumsResponse = Medium[];
