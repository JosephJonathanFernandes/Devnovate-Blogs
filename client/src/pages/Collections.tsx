import { useCollectionsPage } from '@/hooks/useCollectionsPage';
import { CollectionsStats } from '@/components/CollectionsStats';
import { CollectionsFilters } from '@/components/CollectionsFilters';
import { CollectionsList } from '@/components/CollectionsList';
import CollectionBuilder from '@/components/CollectionBuilder';

const Collections: React.FC = () => {
  const {
    filteredCollections,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    layout,
    setLayout,
    isBuilderOpen,
    setIsBuilderOpen,
    editingCollection,
    handleCreateCollection,
    handleEditCollection,
    handleSaveCollection,
    handleDeleteCollection,
    handleViewCollection,
    stats,
  } = useCollectionsPage();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Collections</h1>
              <p className="text-muted-foreground mt-1">
                Organize and curate your learning journey
              </p>
            </div>
            <button onClick={handleCreateCollection} className="flex items-center space-x-2 btn btn-primary">
              <span>Create Collection</span>
            </button>
          </div>
          <CollectionsStats stats={stats} />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <CollectionsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          layout={layout}
          setLayout={setLayout}
          onCreateCollection={handleCreateCollection}
        />
        <CollectionsList
          filteredCollections={filteredCollections}
          layout={layout}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onCreateCollection={handleCreateCollection}
          onView={handleViewCollection}
          onEdit={handleEditCollection}
          onDelete={handleDeleteCollection}
        />
      </div>
      <CollectionBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onSave={handleSaveCollection}
        collection={editingCollection}
        mode={editingCollection ? 'edit' : 'create'}
      />
    </div>
  );
};

export default Collections;
