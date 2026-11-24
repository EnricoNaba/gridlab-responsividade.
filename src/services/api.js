// src/services/api.js
export async function fetchRepoInfo(owner, repo) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os metadados do repositório.');
  }
  return response.json();
}
