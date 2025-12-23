import CollectionCard from '@/components/CollectionCard';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { DevCollection } from '@/types/collections';

interface CollectionsListProps {
  filteredCollections: DevCollection[];
  layout: 'grid' | 'list';
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
  onCreateCollection: () => void;
  onView: (collection: DevCollection) => void;
  onEdit: (collection: DevCollection) => void;
  onDelete: (collection: DevCollection) => void;
}

export function CollectionsList({
  filteredCollections,
  layout,
  searchTerm,
  selectedCategory,
  selectedDifficulty,
  onCreateCollection,
  onView,
  onEdit,
  onDelete,
}: CollectionsListProps) {
  if (filteredCollections.length === 0) {
    return (
      <div className="text-center py-12">
        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No collections found</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all'
            ? 'Try adjusting your filters or search terms.'
            : 'Create your first collection to get started!'}
        </p>
        {!searchTerm && selectedCategory === 'all' && selectedDifficulty === 'all' && (
          <Button onClick={onCreateCollection}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Collection
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className={layout === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-4"
    }>
      {filteredCollections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          className={layout === 'list' ? "flex-row" : ""}
        />
      ))}
    </div>
  );
}
