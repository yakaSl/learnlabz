/**
 * Menu Service
 * Handles menu-related API calls
 */

import { BaseApiService, ApiServiceResponse } from './base.service';
import type { MenuResponse } from '@/types/menu.types';

export class MenuService extends BaseApiService {
  private static readonly ENDPOINTS = {
    getMenu: '/user/users/get-menu',
  };

  /**
   * Fetch menu items for a specific user
   */
  static async getMenu(
    userId: string,
    instituteId?: string
  ): Promise<ApiServiceResponse<MenuResponse>> {
    const params: Record<string, string> = { userId };
    if (instituteId) {
      params.instituteId = instituteId;
    }

    return this.get<MenuResponse>(
      this.ENDPOINTS.getMenu,
      params,
      'MenuService.getMenu'
    );
  }
}

export default MenuService;
