import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid3X3, List, Plus } from 'lucide-react';

interface CollectionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (val: string) => void;
  layout: 'grid' | 'list';
  setLayout: (val: 'grid' | 'list') => void;
  onCreateCollection: () => void;
}

export function CollectionsFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  layout,
  setLayout,
  onCreateCollection,
}: CollectionsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="ai-ml">AI & ML</SelectItem>
            <SelectItem value="game-dev">Game Dev</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="data-science">Data Science</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border rounded-md">
          <Button
            variant={layout === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayout('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayout('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onCreateCollection} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create</span>
        </Button>
      </div>
    </div>
  );
}
