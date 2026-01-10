export interface MenuPermission {
  mst_permission_id: string;
  meta_permission_id: string;
  meta_permission_name: string;
  meta_permission_code: string;
  mst_permission_code: string;
}

export interface MenuItem {
  menu_name: string;
  menu_code: string;
  meta_module_id: string;
  menu_type: 'MAIN' | 'SUB';
  path: string | null;
  icon: string | null;
  children: MenuItem[];
  permission: MenuPermission[];
}

export interface MenuResponse {
  success: boolean;
  data: MenuItem[];
  message: string;
  timestamp: string;
  metadata: {
    requestId: string;
    version: string;
    processingTime: number;
  };
}
