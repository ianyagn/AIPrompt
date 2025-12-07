export interface PromptCardData {
  id: string;
  author: string;
  authorUrl?: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  promptCN: string;
  promptEN: string;
  isFeatured?: boolean;
  tags?: string[];
  likes?: number;
  category: string;
  isDeleted?: number;
}
