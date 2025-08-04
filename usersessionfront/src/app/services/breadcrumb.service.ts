

export interface BreadcrumbLink {
  link?: string;
  page?: string;
  active_link?: boolean;
}

export interface BreadcrumbData {
  page_title?: string;
  back?: string;
  links?: BreadcrumbLink[];
}
