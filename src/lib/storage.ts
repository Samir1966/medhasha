import { Post } from "@/types/community";

const STORAGE_KEY = "brainhope_community_posts";
const USER_ID_KEY = "brainhope_user_id";

// Get or create a unique user ID
export function getUserId(): string {
    if (typeof window === "undefined") return "anonymous";

    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
}

// Load posts from localStorage
export function loadPosts(): Post[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Error loading posts:", error);
    }
    return [];
}

// Save posts to localStorage
export function savePosts(posts: Post[]): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error("Error saving posts:", error);
    }
}

// Add a new post
export function addPost(post: Omit<Post, "id" | "timestamp">): Post {
    const newPost: Post = {
        ...post,
        id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        likedBy: [],
    };

    const posts = loadPosts();
    posts.unshift(newPost); // Add to beginning
    savePosts(posts);

    return newPost;
}

// Update an existing post
export function updatePost(postId: string, updates: Partial<Post>): void {
    const posts = loadPosts();
    const index = posts.findIndex((p) => p.id === postId);

    if (index !== -1) {
        posts[index] = { ...posts[index], ...updates };
        savePosts(posts);
    }
}

// Delete a post
export function deletePost(postId: string): void {
    const posts = loadPosts();
    const filtered = posts.filter((p) => p.id !== postId);
    savePosts(filtered);
}

// Toggle like on a post
export function toggleLike(postId: string, userId: string): void {
    const posts = loadPosts();
    const post = posts.find((p) => p.id === postId);

    if (post) {
        if (!post.likedBy) post.likedBy = [];

        const hasLiked = post.likedBy.includes(userId);
        if (hasLiked) {
            post.likedBy = post.likedBy.filter((id) => id !== userId);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.likedBy.push(userId);
            post.likes += 1;
        }

        savePosts(posts);
    }
}

// Check if user has liked a post
export function hasUserLiked(post: Post, userId: string): boolean {
    return post.likedBy?.includes(userId) || false;
}
