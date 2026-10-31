
const paths = {
  wallet: (
    <>
      <path d="M4 7V5a2 2 0 0 1 2-2h12v4" />
      <rect x="3" y="7" width="18" height="14" rx="3" />
      <path d="M16 12h5v5h-5a2.5 2.5 0 0 1 0-5Z" />
    </>
  ),

  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),

  receipt: (
    <path d="M6 3h12v19l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6m-6 4h4" />
  ),

  plus: <path d="M12 5v14M5 12h14" />,

  logout: (
    <>
      <path d="M10 4H5v16h5M14 8l4 4-4 4m4-4H9" />
    </>
  ),

  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4m8-4v4M3 10h18" />
    </>
  ),

  // Indian Rupee icon
  rupee: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 7h8M8 10h8M8 7h2.5a3 3 0 0 1 0 6H8l6 5" />
    </>
  ),

  // Keep this alias if any existing component still uses name="dollar"
  dollar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5c-.8-.7-1.8-1-3-1-1.7 0-3 .8-3 2s1 1.8 3 2.5 3 1.3 3 2.7-1.4 2.3-3.2 2.3c-1.3 0-2.6-.4-3.5-1.2M12 5.5v13" />
    </>
  ),

  trend: <path d="m4 16 5-6 4 3 7-8m-5 0h5v5" />,

  count: (
    <>
      <path d="M7 3h10v4H7zM5 7h14v14H5z" />
      <path d="M9 12h6m-6 4h4" />
    </>
  ),

  chart: <path d="M4 20V10m6 10V4m6 16v-7m5 7H2" />,

  pie: (
    <>
      <path d="M11 3a9 9 0 1 0 10 10H11V3Z" />
      <path d="M15 3.5A8 8 0 0 1 20.5 9H15V3.5Z" />
    </>
  ),

  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,

  edit: (
    <>
      <path d="m4 16-1 5 5-1L19 9l-4-4L4 16Z" />
      <path d="m13 7 4 4" />
    </>
  ),

  trash: (
    <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6m4-6v6" />
  ),

  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),

  chevron: <path d="m9 18 6-6-6-6" />,

  close: <path d="M5 5l14 14M19 5 5 19" />,

  menu: <path d="M4 7h16M4 12h16M4 17h16" />,

  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 6-3 7-3 8h18c0-1-3-2-3-8" />
      <path d="M10 21h4" />
    </>
  ),

  check: <path d="m5 12 4 4L19 6" />,

  filter: <path d="M4 6h16M7 12h10m-7 6h4" />,

  // Authentication icons
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),

  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),

  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
    </>
  ),

  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),

  "eye-off": (
    <>
      <path d="m3 3 18 18" />
      <path d="M10.6 6.2A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.7M6.2 6.2C3.8 7.8 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5" />
    </>
  ),

  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      >
        {paths[name] || null}
      </g>
    </svg>
  );
}
