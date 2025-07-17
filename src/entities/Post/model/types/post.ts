export interface Post {
  id: string;
  type: "article" | "quote" | "termin" | "persona";
  genre:
    | "history"
    | "mathematics"
    | "programming"
    | "philosophy"
    | "science"
    | "literature"
    | "economics"
    | "psychology"
    | "culture";
  title: string;
  content: PostContent;
  tags: string[];
  authorId: number;
  createdAt: string;
  suggestions: Suggestion[];
  rating: number;
  votes: number;
  isVerified: boolean;
}

export interface PostContent {
  definition: string; 
  source: string; 
  structuredContent: StructuredContent[];
}

export interface Suggestion {
  id: string;
  content: SuggestionContent;
  comment: string;
  authorId: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface SuggestionContent {
  definition: string;
  source: string; 
  structuredContent: StructuredContent[];
}

export interface StructuredContent {
  id?: string; // Уникальный идентификатор (для новых объектов)
  type: "Facts" | "Note" | "Example" | "List";
  data: FactsData | NoteData | ExampleData ;
  suggested_by?: number; // ID автора, предложившего элемент
}
export interface FactsData {
  items: string[];
}

export interface NoteData {
  items: string[];

}

export interface ExampleData {
  items: { title: string; description: string }[];
}

export interface PullRequest {
  id: string;
  postId: string;
  authorId: number;
  authorName: string;
  suggestToAdd: StructuredContent[];
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}