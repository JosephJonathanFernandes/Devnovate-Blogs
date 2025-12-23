import { useState, useEffect, useCallback } from 'react';
import { getAdminStats, getPendingArticles, approveArticle, rejectArticle } from '../services/apiClient';
import { AdminStats, PendingArticle } from '../types/admin';

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalArticles: 0,
    pendingReviews: 0,
    monthlyViews: 0,
  });
  const [pendingArticles, setPendingArticles] = useState<PendingArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err: any) {
      setError('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPendingArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPendingArticles();
      setPendingArticles(data);
    } catch (err: any) {
      setError('Failed to fetch pending articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchPendingArticles();
  }, [fetchStats, fetchPendingArticles]);

  const handleApprove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await approveArticle(id);
      setPendingArticles((prev) => prev.filter((a) => a.id !== id));
      setStats((prev) => ({ ...prev, pendingReviews: prev.pendingReviews - 1 }));
    } catch (err: any) {
      setError('Failed to approve article');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await rejectArticle(id);
      setPendingArticles((prev) => prev.filter((a) => a.id !== id));
      setStats((prev) => ({ ...prev, pendingReviews: prev.pendingReviews - 1 }));
    } catch (err: any) {
      setError('Failed to reject article');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (id: string) => {
    // Implement preview logic, e.g., open modal or navigate
  };

  return {
    stats,
    pendingArticles,
    loading,
    error,
    handleApprove,
    handleReject,
    handlePreview,
    fetchStats,
    fetchPendingArticles,
  };
}
