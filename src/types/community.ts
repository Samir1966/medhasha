export interface Post {
    id: string;
    author: string;
    avatar: string;
    content: string;
    image?: string;
    audio?: boolean;
    likes: number;
    comments: number;
    timestamp: number;
    likedBy?: string[]; // Track who liked the post
}

export interface NewPostData {
    content: string;
    image?: string;
    audio?: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    timestamp: number;
}
