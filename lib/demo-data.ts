// Demo user
export const demoUser = {
  id: 1,
  email: "demo@example.com",
  name: "Demo User",
  // This is a valid bcrypt hash for "password123"
  passwordHash: "$2a$10$zRmJFUGLP8i.BIKVgZlSEOXXJbU2veA9c78gSGmYvMRjiYxWdOKpC",
}

// Demo folders
export const demoFolders = [
  {
    id: 1,
    name: "My Files",
    parent_id: null,
    user_id: 1,
    is_locked: false,
    is_favorite: false,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Documents",
    parent_id: 1,
    user_id: 1,
    is_locked: false,
    is_favorite: true,
    created_at: "2023-01-02T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Images",
    parent_id: 1,
    user_id: 1,
    is_locked: false,
    is_favorite: false,
    created_at: "2023-01-03T00:00:00Z",
    updated_at: "2023-01-03T00:00:00Z",
  },
  {
    id: 4,
    name: "Work",
    parent_id: 2,
    user_id: 1,
    is_locked: false,
    is_favorite: false,
    created_at: "2023-01-04T00:00:00Z",
    updated_at: "2023-01-04T00:00:00Z",
  },
]

// Demo files
export const demoFiles = [
  {
    id: 1,
    name: "Project Proposal",
    extension: "docx",
    size: 2500000,
    mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    user_id: 1,
    folder_id: 2,
    is_locked: false,
    is_favorite: true,
    created_at: "2023-01-05T00:00:00Z",
    updated_at: "2023-01-05T00:00:00Z",
  },
  {
    id: 2,
    name: "Budget",
    extension: "xlsx",
    size: 1200000,
    mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    user_id: 1,
    folder_id: 2,
    is_locked: true,
    is_favorite: false,
    created_at: "2023-01-06T00:00:00Z",
    updated_at: "2023-01-06T00:00:00Z",
  },
  {
    id: 3,
    name: "Team Photo",
    extension: "jpg",
    size: 3700000,
    mime_type: "image/jpeg",
    user_id: 1,
    folder_id: 1,
    is_locked: false,
    is_favorite: false,
    created_at: "2023-01-07T00:00:00Z",
    updated_at: "2023-01-07T00:00:00Z",
  },
]

// Demo notes
export const demoNotes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discussed project timeline and deliverables. Next meeting scheduled for next week.",
    user_id: 1,
    folder_id: null,
    is_locked: false,
    is_favorite: true,
    created_at: "2023-01-08T00:00:00Z",
    updated_at: "2023-01-08T00:00:00Z",
  },
  {
    id: 2,
    title: "Project Ideas",
    content: "New feature ideas for the upcoming release:\n- Improved search\n- Dark mode\n- Mobile app",
    user_id: 1,
    folder_id: null,
    is_locked: false,
    is_favorite: false,
    created_at: "2023-01-09T00:00:00Z",
    updated_at: "2023-01-09T00:00:00Z",
  },
  {
    id: 3,
    title: "Personal Goals",
    content:
      "My personal goals for the next year:\n1. Learn a new programming language\n2. Complete 5 side projects\n3. Contribute to open source",
    user_id: 1,
    folder_id: null,
    is_locked: true,
    is_favorite: false,
    created_at: "2023-01-10T00:00:00Z",
    updated_at: "2023-01-10T00:00:00Z",
  },
]

// Demo tags
export const demoTags = [
  {
    id: 1,
    name: "Work",
    color: "bg-blue-500",
    user_id: 1,
    created_at: "2023-01-11T00:00:00Z",
  },
  {
    id: 2,
    name: "Personal",
    color: "bg-green-500",
    user_id: 1,
    created_at: "2023-01-12T00:00:00Z",
  },
  {
    id: 3,
    name: "Urgent",
    color: "bg-red-500",
    user_id: 1,
    created_at: "2023-01-13T00:00:00Z",
  },
]

// Demo user settings
export const demoUserSettings = {
  user_id: 1,
  theme: "system",
  default_view: "list",
  storage_limit: 5368709120, // 5GB
  updated_at: "2023-01-14T00:00:00Z",
}
