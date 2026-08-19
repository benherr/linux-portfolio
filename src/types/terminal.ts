export type OutputType = "text" | "success" | "error" | "warning" | "info" | "banner" | "table";

export interface TerminalOutput {
  id: string;
  type: OutputType;
  content: string | React.ReactNode;
}

export interface TerminalHistoryItem {
  command: string;
  outputs: TerminalOutput[];
  cwd: string;
  timestamp: string;
}
