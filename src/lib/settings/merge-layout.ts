type RoleLayout = any;
type UserLayout = any;

export function mergeLayout(
    roleLayout: RoleLayout,
    userLayout: UserLayout,
) {
    if(!roleLayout) {
        return null;
    }

    const layout = structuredClone(
        roleLayout.layout
    )

    if(!userLayout) {
        return layout;
    }

      /*
   * Sidebar
   */

  for (const key in layout.sidebar) {
    const ownerEnabled =
      layout.sidebar[key].enabled;

    const userEnabled =
      userLayout.layout?.sidebar?.[key];

    layout.sidebar[key].enabled =
      ownerEnabled &&
      (userEnabled ?? true);
  }

  /*
   * Dashboard
   */

  for (const key in layout.dashboard) {
    const ownerEnabled =
      layout.dashboard[key].enabled;

    const userEnabled =
      userLayout.layout?.dashboard?.[key];

    layout.dashboard[key].enabled =
      ownerEnabled &&
      (userEnabled ?? true);
  }

  /*
   * Quick Actions
   */

  for (const key in layout.quickActions) {
    const ownerEnabled =
      layout.quickActions[key].enabled;

    const userEnabled =
      userLayout.layout?.quickActions?.[key];

    layout.quickActions[key].enabled =
      ownerEnabled &&
      (userEnabled ?? true);
  }

  return layout;
}