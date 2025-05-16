// This file is kept for compatibility but doesn't actually connect to a database

export async function executeQuery(query: string, params: any[] = []) {
  console.log("Mock query execution:", { query, params })
  return []
}
