export interface HighlightResult {
  matchLevel: string;
  matchedWords: [string];
  value: string;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface ProcessingTimingsMS {
  afterFetch: {
    total: number;
  };
  total: number;
}

export interface News {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: number;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: [string];
  objectID: string;
  _highlightResult:
    {
      author: HighlightResult;
      story_text: HighlightResult;
      title: HighlightResult;
      url: HighlightResult;
    };
}


export interface NewsResponse {
  hits: [News];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: ProcessingTimingsMS;
}

export interface Comment {
  created_at: string;
  title: string;
  url: string;
  author: string;
  _points: string;
  story_text: string;
  comment_text: string;
  num_comments: string;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: [string];
  objectID: string;
  _highlightResult: {
    author: HighlightResult;
    comment_text: HighlightResult;
    story_title: HighlightResult;
    story_url: HighlightResult;
  }
  children?: Comment[];
}

export interface NewsCommentsResponse {
  hits: [Comment];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface CommentNode {
  expandable: boolean;
  level: number;
  created_at: string;
  title: string;
  url: string;
  author: string;
  _points: string;
  story_text: string;
  comment_text: string;
  num_comments: string;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: [string];
  objectID: string;
  _highlightResult: {
    author: HighlightResult;
    comment_text: HighlightResult;
    story_title: HighlightResult;
    story_url: HighlightResult;
  }
}
