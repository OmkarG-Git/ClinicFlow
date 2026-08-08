export type FinalLayout = {
  sidebar: Record<
    string,
    {
      enabled: boolean;
    }
  >;

  dashboard: Record<
    string,
    {
      enabled: boolean;
    }
  >;

  quickActions: Record<
    string,
    {
      enabled: boolean;
    }
  >;
};