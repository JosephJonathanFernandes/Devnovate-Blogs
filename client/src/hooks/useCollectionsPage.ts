import { useState, useEffect } from 'react';
import { DevCollection } from '@/types/collections';
import { collectionTemplates } from '@/data/collectionTemplates';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockCollections: DevCollection[] = [
  // ...copy mockCollections array from Collections.tsx...
];

export function useCollectionsPage() {
  const [collections, setCollections] = useState<DevCollection[]>(mockCollections);
  const [filteredCollections, setFilteredCollections] = useState<DevCollection[]>(mockCollections);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<DevCollection | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    let filtered = collections;
    if (searchTerm) {
      filtered = filtered.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(collection => {
        const template = collectionTemplates.find(t => t.category === selectedCategory);
        return template && collection.tags.some(tag => template.tags.includes(tag));
      });
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(collection => collection.difficulty === selectedDifficulty);
    }
    setFilteredCollections(filtered);
  }, [collections, searchTerm, selectedCategory, selectedDifficulty]);

  const handleCreateCollection = () => {
    setEditingCollection(undefined);
    setIsBuilderOpen(true);
  };

  const handleEditCollection = (collection: DevCollection) => {
    setEditingCollection(collection);
    setIsBuilderOpen(true);
  };

  const handleSaveCollection = (collectionData: Partial<DevCollection>) => {
    if (editingCollection) {
      setCollections(prev => prev.map(c =>
        c.id === editingCollection.id
          ? { ...c, ...collectionData, updatedAt: new Date() }
          : c
      ));
      toast({
        title: "Collection Updated",
        description: "Your collection has been updated successfully.",
      });
    } else {
      const newCollection: DevCollection = {
        ...collectionData,
        id: `collection-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        articleCount: 0,
        followers: 0,
        createdBy: 'current-user-id'
      } as DevCollection;
      setCollections(prev => [newCollection, ...prev]);
      toast({
        title: "Collection Created",
        description: "Your new collection has been created successfully.",
      });
    }
  };

  const handleDeleteCollection = (collection: DevCollection) => {
    setCollections(prev => prev.filter(c => c.id !== collection.id));
    toast({
      title: "Collection Deleted",
      description: "The collection has been deleted successfully.",
    });
  };

  const handleViewCollection = (collection: DevCollection) => {
    // Navigate to collection view page
    console.log('Viewing collection:', collection.name);
  };

  const getStats = () => {
    const totalCollections = collections.length;
    const publicCollections = collections.filter(c => c.isPublic).length;
    const totalArticles = collections.reduce((sum, c) => sum + c.articleCount, 0);
    const totalFollowers = collections.reduce((sum, c) => sum + c.followers, 0);
    const totalReadingTime = collections.reduce((sum, c) => sum + (c.estimatedTime || 0), 0);
    return { totalCollections, publicCollections, totalArticles, totalFollowers, totalReadingTime };
  };

  const stats = getStats();

  return {
    collections,
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
    setEditingCollection,
    handleCreateCollection,
    handleEditCollection,
    handleSaveCollection,
    handleDeleteCollection,
    handleViewCollection,
    stats,
  };
}
