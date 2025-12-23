import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

interface TrendingSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function TrendingSearchBar({ value, onChange }: TrendingSearchBarProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search trending articles..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full max-w-md"
      />
    </div>
  );
}
