import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

/** Ícone “->]” */
export default function AccessAccountIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" fontSize="inherit">
      {/* seta */}
      <path
        d="M4 12h10M11 8l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* colchete ] */}
      <path
        d="M18 5h2v14h-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}